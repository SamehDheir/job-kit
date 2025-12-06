// ThemeContext.tsx

"use client";
import { createContext, useContext, useState, ReactNode, useLayoutEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 💡 دالة مساعدة لتطبيق الـ Class على عنصر HTML
const applyTheme = (newTheme: Theme) => {
  document.documentElement.classList.toggle("dark", newTheme === "dark");
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // ⚠️ التغيير هنا: نبدأ بقيمة null لمنع الوميض الأولي الخاطئ.
  // سيتم تعيين القيمة الصحيحة في useLayoutEffect
  const [theme, setTheme] = useState<Theme | null>(null);

  // useLayoutEffect عشان يتنفذ قبل paint
  useLayoutEffect(() => {
    // قراءة الثيم المخزن أو المفضل
    const storedTheme = localStorage.getItem("theme") as Theme;
    const initialTheme: Theme =
      storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    // نتأكد من أن الثيم الحالي ليس null قبل التبديل
    if (theme === null) return; 

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };
  
  // ⛔️ نقطة مهمة: نستخدم القيمة الافتراضية "light" إذا كان الثيم لا يزال null
  // (أثناء الـ Server Rendering) أو نستخدم القيمة المحدثة.
  // يجب أن تكون القيمة من نوع ThemeContextType
  if (theme === null) {
    return (
        <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
  }


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};

// ... useTheme remains the same

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};