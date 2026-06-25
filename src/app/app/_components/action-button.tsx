"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "icon" | "primary" | "danger";
  children: ReactNode;
}

export default function ActionButton({ children, className, ...props }: Props) {
  const base =
    "flex items-center justify-center rounded-full transition-all duration-100 text-white cursor-pointer text-sm bg-[#333] hover:opacity-85 active:opacity-100 disabled:opacity-90 px-7 py-2 w-fit";

  return (
    <button className={`${base} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}
