import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { email, password, confirmPassword, fullName, phone } = await req.json()

    // Validasi field kosong
    if (!email || !password || !confirmPassword || !fullName || !phone) {
      return NextResponse.json({ message: 'Semua field harus diisi' }, { status: 400 })
    }

    // Validasi password cocok
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Password tidak cocok' }, { status: 400 })
    }

    // Cek duplikasi email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUserByEmail) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 })
    }

    // Cek duplikasi phone
    const existingUserByPhone = await prisma.user.findFirst({
      where: { phoneNumber: phone },
    })
    if (existingUserByPhone) {
      return NextResponse.json({ message: 'Nomor telepon sudah terdaftar' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user baru
    const newUser = await prisma.user.create({
      data: {
        email,
        nama: fullName,
        phoneNumber: phone,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'Registrasi berhasil', userId: newUser.id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan' }, { status: 500 })
  }
}
