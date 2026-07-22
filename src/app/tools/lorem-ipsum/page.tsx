"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

const LOREM_WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis quasi architecto beatae vitae dicta explicabo nemo ipsam quia voluptas aspernatur aut odit fugit consequuntur magni dolores eos qui ratione sequi nesciunt neque porro quisquam dolorem adipiscimur aliquid commodi consequatur quis autem reprehenderit iure impedit quibusdam necessitatibus saepe eveniet ut perspiciatis omnis repudiandae";

const LOREM_SENTENCES = [
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
  "Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.",
];

const LOREM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
];

function generateLorem(count: number, type: "words" | "sentences" | "paragraphs"): string {
  const result: string[] = [];

  if (type === "words") {
    const words = LOREM_WORDS.split(" ");
    for (let i = 0; i < count; i++) {
      result.push(words[i % words.length]);
      if ((i + 1) % 10 === 0) result.push("");
    }
    return result.join(" ").trim();
  }

  if (type === "sentences") {
    for (let i = 0; i < count; i++) {
      result.push(LOREM_SENTENCES[i % LOREM_SENTENCES.length]);
    }
    return result.join(" ");
  }

  for (let i = 0; i < count; i++) {
    result.push(LOREM_PARAGRAPHS[i % LOREM_PARAGRAPHS.length]);
  }
  return result.join("\n\n");
}

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"words" | "sentences" | "paragraphs">(
    "paragraphs"
  );
  const [output, setOutput] = useState("");

  const generate = () => {
    setOutput(generateLorem(count, type));
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for designs and mockups"
      icon="¶"
      color="#6366f1"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Count</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, +e.target.value)))}
              className="code-editor w-24 rounded-xl border border-border bg-card px-3 py-2.5 text-card-foreground"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Type</label>
            <div className="flex gap-1.5">
              {(["words", "sentences", "paragraphs"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-all ${
                    type === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            Generate
          </button>
        </div>

        {output && (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {output.split(" ").length} words &middot;{" "}
                {output.split(/\n\n/).length} paragraphs
              </span>
              <CopyButton text={output} label="Copy All" />
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-card-foreground">
              {output}
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
