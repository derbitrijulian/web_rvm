import prisma from '../lib/prisma.js';

/**
 * Service untuk mengelola bottle count user
 */
export class BottleService {
  /**
   * Mendapatkan bottle count untuk user
   * @param {string} userId - ID user
   * @returns {Promise<Object>} Bottle count data
   */
  async getUserBottleCount(userId) {
    try {
      let bottleCount = await prisma.userBottleCount.findUnique({
        where: { userId },
        include: { user: { select: { id: true, nama: true, email: true } } },
      });

      // Jika belum ada record, buat baru
      if (!bottleCount) {
        bottleCount = await this.createUserBottleCount(userId);
      }

      return bottleCount;
    } catch (error) {
      throw new Error(`Failed to get user bottle count: ${error.message}`);
    }
  }

  /**
   * Membuat record bottle count baru untuk user
   * @param {string} userId - ID user
   * @returns {Promise<Object>} Created bottle count data
   */
  async createUserBottleCount(userId) {
    try {
      // Pastikan user ada
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const bottleCount = await prisma.userBottleCount.create({
        data: {
          userId,
          totalBottles: 0,
          redeemableCount: 0,
          lifetimeCount: 0,
        },
        include: { user: { select: { id: true, nama: true, email: true } } },
      });

      return bottleCount;
    } catch (error) {
      throw new Error(`Failed to create user bottle count: ${error.message}`);
    }
  }

  /**
   * Menambah bottle count (deposit dari RVM)
   * @param {string} userId - ID user
   * @param {number} amount - Jumlah bottle yang ditambahkan
   * @param {number} rvmLocationId - ID lokasi RVM (optional)
   * @param {string} description - Deskripsi transaksi (optional)
   * @returns {Promise<Object>} Updated bottle count
   */
  async addBottles(userId, amount, rvmLocationId = null, description = null) {
    try {
      // Validasi input
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      return await prisma.$transaction(async (prisma) => {
        // Update bottle count
        const updatedBottleCount = await prisma.userBottleCount.upsert({
          where: { userId },
          update: {
            totalBottles: { increment: amount },
            redeemableCount: { increment: amount },
            lifetimeCount: { increment: amount },
            lastUpdated: new Date(),
          },
          create: {
            userId,
            totalBottles: amount,
            redeemableCount: amount,
            lifetimeCount: amount,
          },
          include: { user: { select: { id: true, nama: true, email: true } } },
        });

        // Catat transaksi
        await prisma.bottleTransaction.create({
          data: {
            userId,
            rvmLocationId,
            type: 'DEPOSIT',
            amount,
            description: description || `Deposit ${amount} bottles from RVM`,
          },
        });

        return updatedBottleCount;
      });
    } catch (error) {
      throw new Error(`Failed to add bottles: ${error.message}`);
    }
  }

  /**
   * Redeem bottles (tukar dengan reward)
   * @param {string} userId - ID user
   * @param {number} amount - Jumlah bottle yang diredeem
   * @param {string} description - Deskripsi redeem
   * @returns {Promise<Object>} Updated bottle count
   */
  async redeemBottles(userId, amount, description = null) {
    try {
      // Validasi input
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      return await prisma.$transaction(async (prisma) => {
        // Cek saldo bottle count
        const currentBottleCount = await prisma.userBottleCount.findUnique({
          where: { userId },
        });

        if (!currentBottleCount) {
          throw new Error('User bottle count not found');
        }

        if (currentBottleCount.redeemableCount < amount) {
          throw new Error(
            `Insufficient bottles. Available: ${currentBottleCount.redeemableCount}, Required: ${amount}`
          );
        }

        // Update bottle count
        const updatedBottleCount = await prisma.userBottleCount.update({
          where: { userId },
          data: {
            redeemableCount: { decrement: amount },
            lastUpdated: new Date(),
          },
          include: { user: { select: { id: true, nama: true, email: true } } },
        });

        // Catat transaksi
        await prisma.bottleTransaction.create({
          data: {
            userId,
            type: 'REDEEM',
            amount: -amount, // Negative untuk redeem
            description: description || `Redeem ${amount} bottles`,
          },
        });

        return updatedBottleCount;
      });
    } catch (error) {
      throw new Error(`Failed to redeem bottles: ${error.message}`);
    }
  }

  /**
   * Mendapatkan history transaksi bottle user
   * @param {string} userId - ID user
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   * @returns {Promise<Object>} Transaction history with pagination
   */
  async getTransactionHistory(userId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [transactions, totalCount] = await Promise.all([
        prisma.bottleTransaction.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.bottleTransaction.count({
          where: { userId },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        transactions,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      throw new Error(`Failed to get transaction history: ${error.message}`);
    }
  }

  /**
   * Adjust bottle count (untuk admin)
   * @param {string} userId - ID user
   * @param {number} amount - Jumlah adjustment (bisa positif atau negatif)
   * @param {string} description - Deskripsi adjustment
   * @returns {Promise<Object>} Updated bottle count
   */
  async adjustBottleCount(userId, amount, description) {
    try {
      if (amount === 0) {
        throw new Error('Adjustment amount cannot be zero');
      }

      return await prisma.$transaction(async (prisma) => {
        const currentBottleCount = await prisma.userBottleCount.findUnique({
          where: { userId },
        });

        if (!currentBottleCount) {
          throw new Error('User bottle count not found');
        }

        // Hitung nilai baru
        const newTotalBottles = Math.max(
          0,
          currentBottleCount.totalBottles + amount
        );
        const newRedeemableCount = Math.max(
          0,
          currentBottleCount.redeemableCount + amount
        );
        const newLifetimeCount =
          amount > 0
            ? currentBottleCount.lifetimeCount + amount
            : currentBottleCount.lifetimeCount;

        // Update bottle count
        const updatedBottleCount = await prisma.userBottleCount.update({
          where: { userId },
          data: {
            totalBottles: newTotalBottles,
            redeemableCount: newRedeemableCount,
            lifetimeCount: newLifetimeCount,
            lastUpdated: new Date(),
          },
          include: { user: { select: { id: true, nama: true, email: true } } },
        });

        // Catat transaksi
        await prisma.bottleTransaction.create({
          data: {
            userId,
            type: 'ADJUSTMENT',
            amount,
            description:
              description ||
              `Manual adjustment: ${amount > 0 ? '+' : ''}${amount} bottles`,
          },
        });

        return updatedBottleCount;
      });
    } catch (error) {
      throw new Error(`Failed to adjust bottle count: ${error.message}`);
    }
  }

  /**
   * Mendapatkan statistik bottle untuk semua user (untuk admin)
   * @returns {Promise<Object>} Bottle statistics
   */
  async getBottleStatistics() {
    try {
      const stats = await prisma.userBottleCount.aggregate({
        _sum: {
          totalBottles: true,
          redeemableCount: true,
          lifetimeCount: true,
        },
        _avg: {
          totalBottles: true,
          redeemableCount: true,
          lifetimeCount: true,
        },
        _count: true,
      });

      const topUsers = await prisma.userBottleCount.findMany({
        orderBy: { lifetimeCount: 'desc' },
        take: 10,
        include: { user: { select: { id: true, nama: true, email: true } } },
      });

      return {
        totalUsers: stats._count,
        totalBottlesInSystem: stats._sum.totalBottles || 0,
        totalRedeemableBottles: stats._sum.redeemableCount || 0,
        lifetimeBottles: stats._sum.lifetimeCount || 0,
        averageBottlesPerUser: Math.round(stats._avg.totalBottles || 0),
        topUsers,
      };
    } catch (error) {
      throw new Error(`Failed to get bottle statistics: ${error.message}`);
    }
  }
}

// Export singleton instance
export const bottleService = new BottleService();
export default bottleService;
