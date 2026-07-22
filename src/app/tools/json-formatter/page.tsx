"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const SAMPLE_JSON = `{
  "name": "DevToolkit",
  "version": "1.0.0",
  "description": "Developer utilities",
  "tools": ["JSON", "JWT", "Base64"],
  "config": {
    "theme": "dark",
    "autoSave": true
  }
}`;

export default function JsonFormatterPage() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError("");
      alert("Valid JSON!");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data"
      icon="{ }"
      color="#3b82f6"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium">Input</label>
            <div className="flex items-center gap-2">
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
                <option value={"\t"}>Tab</option>
              </select>
              <button
                onClick={() => setInput("")}
                className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs text-secondary-foreground hover:bg-accent"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="code-editor h-96 w-full resize-none rounded-xl border border-border bg-card p-4 text-card-foreground placeholder:text-muted-foreground"
            placeholder='Paste your JSON here...'
            spellCheck={false}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <pre className="code-editor h-96 overflow-auto rounded-xl border border-border bg-card p-4 text-card-foreground">
            {error ? (
              <span className="text-error">{error}</span>
            ) : output ? (
              output
            ) : (
              <span className="text-muted-foreground">
                Click &quot;Format&quot; to see the result
              </span>
            )}
          </pre>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={format}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-accent active:scale-95"
        >
          Minify
        </button>
        <button
          onClick={validate}
          className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-accent active:scale-95"
        >
          Validate
        </button>
      </div>
    </ToolLayout>
  );
}
