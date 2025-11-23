import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            companyName: true,
            location: true,
            logo: true
          }
        }
      }
    });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ job });

  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const updates = await request.json();
    
    // Validate that job exists and belongs to company
    const existingJob = await prisma.job.findUnique({
      where: { id },
      include: { company: true }
    });

    if (!existingJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Update the job
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        company: {
          select: {
            companyName: true,
            location: true,
            logo: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Job updated successfully',
      job: updatedJob
    });

  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    // Check if job exists and belongs to company
    const existingJob = await prisma.job.findUnique({
      where: { id },
      include: { company: true }
    });

    if (!existingJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Delete the job
    await prisma.job.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Job deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}