"use client";

import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  icon,
  color,
  children,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </Link>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl text-xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
