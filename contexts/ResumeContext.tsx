// src/contexts/ResumeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ResumeData } from "@/types/resume.data.types";

interface ResumeContextProps {
    resumeData: ResumeData;
    setResumeData: (data: ResumeData) => void;
    saveResume: () => Promise<void>;
    loading: boolean;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    // Initial state for Resume Data
    const [resumeData, setResumeData] = useState<ResumeData>({
        name: "",
        email: "",
        phone: "",
        summary: "",
        skills: [],
        languages: [],
        education: [],
        experience: [],
        projects: [],
    });

    const [loading, setLoading] = useState(false);

    // Function to save resume data to the database via API route
    const saveResume = async () => {
        setLoading(true);
        try {
            // Convert complex objects (arrays of objects) to JSON strings
            // to match the `Json` field type in Prisma schema.
            const dataToSend = {
                ...resumeData,
                education: JSON.stringify(resumeData.education),
                experience: JSON.stringify(resumeData.experience),
                projects: JSON.stringify(resumeData.projects),
                // You might need to add userId here if you're using authentication
                // userId: "some-user-id" // Replace with actual logic to get userId
            };


            const res = await fetch("/api/resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend), // Send the prepared data
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save resume");
            }

            const data = await res.json();
            console.log("Saved Resume:", data);
        } catch (err) {
            console.error("Error saving resume:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, saveResume, loading }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) throw new Error("useResume must be used within ResumeProvider");
    return context;
};