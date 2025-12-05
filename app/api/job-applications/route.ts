import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const email = request.headers.get('x-user-email');
    
    if (!email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { email },
      include: {
        job: {
          include: { company: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(applications);
  } catch (error) {
  console.error('API Error:', error); 
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
} finally {
    await prisma.$disconnect();
  }
}