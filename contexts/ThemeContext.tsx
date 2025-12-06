"use client";

import { createContext, useContext, useState, ReactNode, useLayoutEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = (theme: Theme) => {
    if (typeof document !== "undefined") {
        // **التعديل الهام:** تطبيق الفئة 'dark' على وسم <html>
        document.documentElement.classList.toggle("dark", theme === "dark");
        // التأكد من إزالة الفئة من body إذا كانت مطبقة بالخطأ
        document.body.classList.remove("dark");
    }
};

const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days = 365) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");


    useLayoutEffect(() => {
        const storedTheme = getCookie("theme") as Theme | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        const initialTheme = storedTheme || systemTheme;

        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);


    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            applyTheme(newTheme);
            setCookie("theme", newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};

export const ThemeClientWrapper = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};