import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType: true
      }
    });

    // Get all companies
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        userId: true,
        companyName: true
      }
    });

    // Get all message threads
    const threads = await prisma.messageThread.findMany({
      select: {
        id: true,
        companyId: true,
        applicantId: true,
        jobId: true,
        lastMessage: true,
        lastMessageAt: true
      }
    });

    // Get all messages
    const messages = await prisma.message.findMany({
      select: {
        id: true,
        threadId: true,
        senderId: true,
        receiverId: true,
        content: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      users,
      companies,
      threads,
      messages,
      counts: {
        users: users.length,
        companies: companies.length,
        threads: threads.length,
        messages: messages.length
      }
    });

  } catch (error: any) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch debug data', details: error.message },
      { status: 500 }
    );
  }
}