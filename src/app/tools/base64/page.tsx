"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

export default function Base64Page() {
  const [input, setInput] = useState("Hello, DevToolkit!");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch (e) {
      setError("Invalid input for " + mode);
      setOutput("");
    }
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings"
      icon="🔄"
      color="#06b6d4"
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === "encode"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              mode === "decode"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Input</label>
              <button
                onClick={() => setInput("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="code-editor h-48 w-full resize-none rounded-xl border border-border bg-card p-4 text-card-foreground placeholder:text-muted-foreground"
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 to decode..."
              }
              spellCheck={false}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Output</label>
              {output && <CopyButton text={output} />}
            </div>
            <pre className="code-editor h-48 overflow-auto rounded-xl border border-border bg-card p-4 text-card-foreground">
              {error ? (
                <span className="text-error">{error}</span>
              ) : output || (
                <span className="text-muted-foreground">
                  Click &quot;{mode === "encode" ? "Encode" : "Decode"}&quot; to see
                  the result
                </span>
              )}
            </pre>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
      </div>
    </ToolLayout>
  );
}
