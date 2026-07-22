"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold text-sm transition-transform duration-200 group-hover:scale-110">
            DT
          </div>
          <span className="text-lg font-semibold tracking-tight hidden sm:block">
            DevToolkit
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
          >
            Tools
          </Link>
          <a
            href="https://github.com/v2Talal"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
          >
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-secondary-foreground transition-all hover:bg-accent hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-secondary-foreground md:hidden transition-all hover:bg-accent"
            aria-label="Toggle menu"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tools
          </Link>
        </div>
      )}
    </nav>
  );
}
