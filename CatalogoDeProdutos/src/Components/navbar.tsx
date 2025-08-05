import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type NavbarProps = {
  children: ReactNode;
  className?: string;
};

export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <header
      className={twMerge(
        "w-full h-16 bg-zinc-900 text-zinc-100 flex items-center justify-between px-6 border-b border-zinc-800",
        className
      )}
    >
      {children}
    </header>
  );
};