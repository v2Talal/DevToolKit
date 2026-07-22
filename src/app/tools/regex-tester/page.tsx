"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState(
    "Contact us at support@devtoolkit.com or admin@example.org for help."
  );

  const matches = useMemo(() => {
    try {
      if (!pattern) return [];
      const regex = new RegExp(pattern, flags);
      const results: { match: string; index: number }[] = [];
      let match;
      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({ match: match[0], index: match.index });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) results.push({ match: match[0], index: match.index });
      }
      return results;
    } catch {
      return [];
    }
  }, [pattern, flags, testString]);

  const error = (() => {
    try {
      if (pattern) new RegExp(pattern, flags);
      return "";
    } catch (e) {
      return (e as Error).message;
    }
  })();

  const highlighted = useMemo(() => {
    if (!pattern || error || matches.length === 0) return null;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; highlight: boolean }[] = [];
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(testString)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), highlight: false });
        }
        parts.push({ text: match[0], highlight: true });
        lastIndex = regex.lastIndex;
        if (match.index === regex.lastIndex) break;
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), highlight: false });
      }
      return parts;
    } catch {
      return null;
    }
  }, [pattern, flags, testString, error]);

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions with real-time matching"
      icon=".*"
      color="#f59e0b"
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="mb-2 block text-sm font-medium">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="code-editor w-full rounded-xl border border-border bg-card px-4 py-3 text-card-foreground placeholder:text-muted-foreground"
              placeholder="Enter regex pattern..."
              spellCheck={false}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Flags</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="code-editor w-24 rounded-xl border border-border bg-card px-4 py-3 text-center text-card-foreground"
              placeholder="g"
              spellCheck={false}
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="code-editor h-32 w-full resize-none rounded-xl border border-border bg-card p-4 text-card-foreground placeholder:text-muted-foreground"
            placeholder="Enter text to test against..."
            spellCheck={false}
          />
        </div>

        {highlighted && highlighted.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              Highlighted Matches
            </label>
            <div className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed">
              {highlighted.map((part, i) =>
                part.highlight ? (
                  <mark
                    key={i}
                    className="rounded bg-warning/20 px-0.5 text-foreground"
                  >
                    {part.text}
                  </mark>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-2 text-sm font-medium">
            Matches ({matches.length})
          </h3>
          {matches.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matches found</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matches.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-lg border border-warning/20 bg-warning/10 px-3 py-1.5 font-mono text-sm text-card-foreground"
                >
                  &quot;{m.match}&quot;
                  <span className="text-xs text-muted-foreground">
                    @{m.index}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
