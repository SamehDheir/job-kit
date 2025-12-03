import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createApiHeaders } from "@/lib/api-utils";
import { Server } from "socket.io";

// GET /api/messages/[threadId] - Get messages for a specific thread
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const headers = createApiHeaders();
    const userId = request.headers.get("x-user-id");
    const { threadId } = await params;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    // Verify user has access to this thread
    const thread = await prisma.messageThread.findFirst({
      where: {
        id: threadId,
        OR: [
          { companyId: userId },
          { applicantId: userId }
        ]
      }
    });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found or access denied" }, { status: 404 });
    }

    // Get messages with pagination
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    const messages = await prisma.message.findMany({
      where: { threadId },
      include: {
        sender: {
          select: {
            id: true,
            name: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'asc' },
      skip: offset,
      take: limit
    });

    // Mark messages as read for the current user
    await prisma.message.updateMany({
      where: {
        threadId,
        receiverId: userId,
        isRead: false
      },
      data: { isRead: true }
    });

    // Update thread read status
    await prisma.messageThread.update({
      where: { id: threadId },
      data: { isRead: true }
    });

    return NextResponse.json(messages, { headers });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST /api/messages/[threadId] - Send a new message in thread
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const headers = createApiHeaders();
    const userId = request.headers.get("x-user-id");
    const { threadId } = await params;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    // Verify user has access to this thread
    const thread = await prisma.messageThread.findFirst({
      where: {
        id: threadId,
        OR: [
          { companyId: userId },
          { applicantId: userId }
        ]
      }
    });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found or access denied" }, { status: 404 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content?.trim()) {
      return NextResponse.json({ error: "Message content required" }, { status: 400 });
    }

    // Determine receiver (the other person in the thread)
    const receiverId = thread.companyId === userId ? thread.applicantId : thread.companyId;

    // Create the message
    const message = await prisma.message.create({
      data: {
        threadId,
        senderId: userId,
        receiverId,
        content: content.trim()
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Update thread with last message info
    await prisma.messageThread.update({
      where: { id: threadId },
      data: {
        lastMessage: content.trim(),
        lastMessageAt: new Date(),
        isRead: false
      }
    });

    // Emit socket event for real-time updates
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/socket`);
      if (global.io) {
        // Emit to thread room
        global.io.to(`thread:${threadId}`).emit('new-message', {
          threadId,
          message: {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            receiverId: message.receiverId,
            createdAt: message.createdAt.toISOString(),
            sender: message.sender
          }
        });

        // Emit to receiver's personal room
        global.io.to(`user:${receiverId}`).emit('thread-updated', {
          threadId,
          lastMessage: content.trim(),
          lastMessageAt: new Date().toISOString()
        });
      }
    } catch (socketError) {
      console.log('Socket not available for real-time update');
    }

    return NextResponse.json(message, { headers, status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
