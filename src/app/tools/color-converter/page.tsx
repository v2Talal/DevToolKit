"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [inputColor, setInputColor] = useState("#3b82f6");

  const updateFromHex = (val: string) => {
    setHex(val);
    setInputColor(val);
    const parsed = hexToRgb(val);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed.r, parsed.g, parsed.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    const newHex = rgbToHex(r, g, b);
    setHex(newHex);
    setInputColor(newHex);
    setHsl(rgbToHsl(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const newRgb = hslToRgb(h, s, l);
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setInputColor(newHex);
  };

  useEffect(() => {
    updateFromHex("#3b82f6");
  }, []);

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert between HEX, RGB, and HSL color formats"
      icon="🎨"
      color="#ec4899"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-3">
            <div
              className="h-24 w-24 rounded-2xl border-2 border-border shadow-inner"
              style={{ backgroundColor: hex }}
            />
            <input
              type="color"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="h-8 w-16 cursor-pointer rounded border-0"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 flex-1">
            <div>
              <label className="mb-1.5 block text-sm font-medium">HEX</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="code-editor flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-card-foreground"
                  spellCheck={false}
                />
                <CopyButton text={hex} />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">RGB</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                  readOnly
                  className="code-editor flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-card-foreground"
                />
                <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">HSL</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                  readOnly
                  className="code-editor flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-card-foreground"
                />
                <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold">Fine-tune RGB</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {(["r", "g", "b"] as const).map((ch) => (
              <div key={ch}>
                <label className="mb-1 block text-xs text-muted-foreground uppercase">
                  {ch === "r" ? "Red" : ch === "g" ? "Green" : "Blue"}
                </label>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={rgb[ch]}
                  onChange={(e) =>
                    updateFromRgb(
                      ch === "r" ? +e.target.value : rgb.r,
                      ch === "g" ? +e.target.value : rgb.g,
                      ch === "b" ? +e.target.value : rgb.b
                    )
                  }
                  className="w-full accent-primary"
                />
                <span className="text-xs text-muted-foreground">{rgb[ch]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
