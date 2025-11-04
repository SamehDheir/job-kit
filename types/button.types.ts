import { ReactNode } from "react";

export type TButton = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};
