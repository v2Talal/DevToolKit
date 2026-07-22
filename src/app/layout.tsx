import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DevToolkit — Developer Utilities",
  description:
    "Free online developer tools: JSON formatter, JWT decoder, Base64 encoder, regex tester, URL encoder, color converter, hash generator, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-card/50 py-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p>
              DevToolkit &mdash; Built with Next.js, TypeScript &amp; Tailwind
              CSS
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
