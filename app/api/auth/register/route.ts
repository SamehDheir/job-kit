import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { RegisterRequest, AuthResponse, ErrorResponse, UserWithPassword } from '@/types/auth.types';

export async function POST(request: Request): Promise<NextResponse<AuthResponse | ErrorResponse>> {
  try {
    const requestData = await request.json();
    const { 
      email, 
      password, 
      userType,
      // Company fields
      companyName,
      industry,
      companySize,
      location,
      website,
      description,
      // Job Seeker fields
      firstName,
      lastName,
      phone,
      city,
      country,
      currentPosition,
      experienceLevel
    } = requestData;

    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!['USER', 'COMPANY'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid account type' },
        { status: 400 }
      );
    }

    // Validate company-specific fields
    if (userType === 'COMPANY') {
      if (!companyName || !industry || !companySize || !location) {
        return NextResponse.json(
          { error: 'Company name, industry, company size, and location are required for company accounts' },
          { status: 400 }
        );
      }
    }

    // Validate job seeker-specific fields
    if (userType === 'USER') {
      if (!firstName || !lastName || !phone || !city) {
        return NextResponse.json(
          { error: 'First name, last name, phone, and city are required for job seeker accounts' },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with transaction to ensure both user and profile are created
    const result = await prisma.$transaction(async (prisma) => {
      // Create the user first
      const user = await prisma.user.create({
        data: {
          name: userType === 'COMPANY' ? companyName : `${firstName} ${lastName}`,
          email,
          password: hashedPassword,
          userType,
        }
      });

      // Create the appropriate profile based on user type
      if (userType === 'COMPANY') {
        await prisma.company.create({
          data: {
            userId: user.id,
            companyName,
            industry,
            companySize,
            location,
            website: website || null,
            description: description || null,
          }
        });
      } else if (userType === 'USER') {
        await prisma.jobSeeker.create({
          data: {
            userId: user.id,
            firstName,
            lastName,
            phone,
            city,
            country: country || null,
            currentPosition: currentPosition || null,
            experienceLevel: experienceLevel || null,
          }
        });
      }

      return user;
    });

    const { password: _, ...userWithoutPassword } = result as UserWithPassword;

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}