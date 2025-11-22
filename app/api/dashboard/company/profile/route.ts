import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(): Promise<NextResponse> {
  try {
    // In real app, get company ID from session/auth
    // For now, get the first company
    const company = await prisma.company.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ company });

  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const updates = await request.json();
    
    // In real app, get company ID from session/auth
    // For now, update the first company
    const existingCompany = await prisma.company.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!existingCompany) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const updatedCompany = await prisma.company.update({
      where: { id: existingCompany.id },
      data: {
        companyName: updates.companyName,
        industry: updates.industry,
        companySize: updates.companySize,
        location: updates.location,
        website: updates.website || null,
        description: updates.description,
        logo: updates.logo || null,
        contactPhone: updates.contactPhone,
        contactEmail: updates.contactEmail,
        establishedYear: updates.establishedYear || null,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: 'Company settings updated successfully',
      company: updatedCompany
    });

  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}