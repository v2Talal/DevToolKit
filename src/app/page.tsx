"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { tools, categories } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/8%,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              8 Developer Tools
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything a developer{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                needs
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A collection of free, fast, and beautiful developer utilities.
              Format JSON, decode JWT, encode Base64, test regex, and much more
              &mdash; all in your browser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={staggerItem}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-border bg-card p-8 text-center sm:p-12"
        >
          <h2 className="text-xl font-semibold">More tools coming soon</h2>
          <p className="mt-2 text-muted-foreground">
            Markdown preview, CSV viewer, diff checker, and more are in the
            works.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
