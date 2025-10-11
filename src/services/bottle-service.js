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
          points: 0,
          lifetimePoints: 0,
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
        // Calculate points (1 bottle = 10 points)
        const pointsToAdd = amount * 50;

        // Update bottle count
        const updatedBottleCount = await prisma.userBottleCount.upsert({
          where: { userId },
          update: {
            totalBottles: { increment: amount },
            redeemableCount: { increment: amount },
            lifetimeCount: { increment: amount },
            points: { increment: pointsToAdd },
            lifetimePoints: { increment: pointsToAdd },
            lastUpdated: new Date(),
          },
          create: {
            userId,
            totalBottles: amount,
            redeemableCount: amount,
            lifetimeCount: amount,
            points: pointsToAdd,
            lifetimePoints: pointsToAdd,
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

  /**
   * Record bottle detection dari Arduino (raw detection)
   * @param {string} deviceId - ID device Arduino
   * @param {number} count - Jumlah bottle yang terdeteksi
   * @param {number} distance - Jarak sensor saat deteksi (optional)
   * @returns {Promise<Object>} Created bottle detection record
   */
  async recordBottleDetection(deviceId, count = 1, distance = null) {
    try {
      const detection = await prisma.bottleCount.create({
        data: {
          deviceId,
          count,
          distance,
          timestamp: new Date(),
        },
      });

      console.log(`✅ Bottle detection recorded:`, {
        deviceId,
        count,
        distance,
        id: detection.id,
      });

      return detection;
    } catch (error) {
      console.error(`❌ Failed to record bottle detection:`, error);
      throw new Error(`Failed to record bottle detection: ${error.message}`);
    }
  }

  /**
   * Process Arduino bottle detection with proper user separation
   * @param {Object} params - Detection parameters
   * @param {string} params.deviceId - Arduino device ID
   * @param {string|null} params.userId - User ID (optional for anonymous detection)
   * @param {number|null} params.rvmLocationId - RVM location ID
   * @param {number} params.count - Number of bottles detected
   * @param {number|null} params.distance - Sensor distance measurement
   * @param {string|null} params.sessionId - User session ID
   * @param {string} params.description - Detection description
   * @returns {Promise<Object>} Processing result with bottle detection and optional user stats
   */
  async processArduinoBottleDetection({
    deviceId,
    userId = null,
    rvmLocationId = null,
    count = 1,
    distance = null,
    sessionId = null,
    description = 'Arduino bottle detection',
  }) {
    try {
      console.log(`🔄 Processing bottle detection:`, {
        deviceId,
        userId: userId || 'anonymous',
        count,
        rvmLocationId,
      });

      // 1. Create bottle detection record
      const bottleDetection = await prisma.bottleCount.create({
        data: {
          deviceId,
          userId,
          rvmLocationId,
          count,
          distance,
          sessionId,
          processed: userId ? true : false, // Mark as processed if user session exists
          timestamp: new Date(),
        },
      });

      let userStats = null;
      let pointsEarned = 0;

      // 2. If user session is active, update user account
      if (userId) {
        try {
          // Verify user exists
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });

          if (!user) {
            console.warn(
              `⚠️ User ${userId} not found, treating as anonymous detection`
            );
            // Update detection to remove invalid userId
            await prisma.bottleCount.update({
              where: { id: bottleDetection.id },
              data: { userId: null, processed: false },
            });
          } else {
            // Calculate points (10 points per bottle)
            pointsEarned = count * 50;

            // Update user bottle count
            userStats = await this.addBottles(
              userId,
              count,
              rvmLocationId,
              description
            );

            // Create transaction record
            await prisma.bottleTransaction.create({
              data: {
                userId,
                rvmLocationId,
                type: 'DEPOSIT',
                amount: count,
                description: `${description} - Device: ${deviceId}`,
              },
            });

            console.log(
              `✅ User account updated: ${userId}, bottles: +${count}, points: +${pointsEarned}`
            );
          }
        } catch (userError) {
          console.error(`❌ Error processing user account:`, userError);
          // Mark detection as unprocessed
          await prisma.bottleCount.update({
            where: { id: bottleDetection.id },
            data: { processed: false },
          });
        }
      }

      return {
        bottleDetection,
        userStats,
        pointsEarned,
      };
    } catch (error) {
      console.error(`❌ Failed to process Arduino bottle detection:`, error);
      throw new Error(`Failed to process bottle detection: ${error.message}`);
    }
  }

  /**
   * Get Arduino connection status
   * @param {string} deviceId - Arduino device ID
   * @returns {Promise<Object|null>} Connection status or null if not found
   */
  async getArduinoConnectionStatus(deviceId) {
    try {
      return await prisma.arduinoConnection.findUnique({
        where: { deviceId },
        include: {
          rvmLocation: {
            select: { id: true, name: true },
          },
        },
      });
    } catch (error) {
      console.error(`❌ Failed to get Arduino connection status:`, error);
      return null;
    }
  }
}

// Export singleton instance
export const bottleService = new BottleService();
export default bottleService;
