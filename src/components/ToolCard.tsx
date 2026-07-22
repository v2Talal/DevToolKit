"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { staggerItem } from "@/lib/animations";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <motion.div variants={staggerItem}>
      <Link
        href={tool.href}
        className="group block rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: tool.color }}
          >
            {tool.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
          </div>
          <svg
            className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:text-primary group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
