import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthGuard>
      <div className="auth-layout">{children}</div>
    </AuthGuard>
  );
}
