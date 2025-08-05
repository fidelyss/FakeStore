import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LeftBarProps = {
  children: ReactNode;
  className?: string;
};

export const LeftBar = ({ children, className }: LeftBarProps) => {
  return (
    <aside
      className={twMerge(
        "h-screen w-64 bg-zinc-900 text-zinc-100 flex flex-col p-4 border-r border-zinc-800",
        className
      )}
    >
      {children}
    </aside>
  );
};