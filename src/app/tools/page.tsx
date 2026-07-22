"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { tools, categories } from "@/lib/tools";
import type { Tool } from "@/lib/tools";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Developer Tools
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {tools.length} free tools to boost your workflow
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={staggerItem}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({tools.filter((t) => t.category === cat.id).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredTools.map((tool: Tool) => (
            <motion.div key={tool.id} variants={staggerItem}>
              <Link
                href={tool.href}
                className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-0.5"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4">
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                    style={{
                      backgroundColor: tool.color + "18",
                      color: tool.color,
                    }}
                  >
                    {tool.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No tools in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
