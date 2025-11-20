// src/app/api/resume/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // **IMPORTANT:** You need to get the user ID from your authentication system (e.g., NextAuth.js, Clerk).
        // Since the user ID is a required field in your Prisma Schema, hardcoding it (like below) is only for
        // testing. You must replace it with actual authentication logic.
        const userId = "clrz8p0000000000000000000"; // Placeholder: **Replace with real user ID logic!**

        if (!data) {
            return NextResponse.json({ message: "No data provided" }, { status: 400 });
        }

        console.log("Resume data received:", data);

        // Note: The fields `education`, `experience`, and `projects` are already
        // JSON-stringified in the `saveResume` function inside the client (ResumeContext.tsx).
        // Prisma's `Json` type handles the string.

        const resume = await prisma.resume.create({
            data: {
                ...data,
                userId: userId, // Link the resume to the user
                // The fields `skills` and `languages` are String[] and are passed correctly.
                // The fields `education`, `experience`, `projects` are Json and are passed correctly as strings.
            },
        });

        return NextResponse.json(resume, { status: 201 });
    } catch (error) {
        console.error("Prisma error in POST /api/resume:", error);
        return NextResponse.json(
            { message: "Error saving resume to database." },
            { status: 500 }
        );
    }
}