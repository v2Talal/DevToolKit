"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

function base64UrlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return "Invalid base64";
  }
}

function decodeJWT(token: string) {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return { error: "Invalid JWT format. A JWT has 3 parts separated by dots." };
  }

  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    const now = Math.floor(Date.now() / 1000);
    let expirationStatus = "";

    if (payload.exp) {
      if (payload.exp < now) {
        expirationStatus = "Expired";
      } else {
        const remaining = payload.exp - now;
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        expirationStatus = `Expires in ${hours}h ${minutes}m`;
      }
    }

    return {
      header,
      payload,
      signature: parts[2],
      expirationStatus,
    };
  } catch {
    return { error: "Failed to decode JWT parts" };
  }
}

function formatDate(ts: number): string {
  try {
    return new Date(ts * 1000).toLocaleString();
  } catch {
    return String(ts);
  }
}

const SAMPLE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDAsInJvbGUiOiJhZG1pbiJ9";

export default function JwtDecoderPage() {
  const [token, setToken] = useState(SAMPLE_TOKEN);
  const [result, setResult] = useState<ReturnType<typeof decodeJWT> | null>(
    null
  );

  const handleDecode = () => {
    setResult(decodeJWT(token));
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens"
      icon="🔐"
      color="#8b5cf6"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            JWT Token
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="code-editor h-28 w-full resize-none rounded-xl border border-border bg-card p-4 text-card-foreground placeholder:text-muted-foreground"
            placeholder="Paste your JWT token here..."
            spellCheck={false}
          />
        </div>

        <button
          onClick={handleDecode}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          Decode JWT
        </button>

        {result && (
          <div className="grid gap-6 lg:grid-cols-2">
            {result.error ? (
              <div className="rounded-xl border border-error/20 bg-error/5 p-4 text-error">
                {result.error}
              </div>
            ) : (
              <>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Header</h3>
                    {result.header && (
                      <CopyButton text={JSON.stringify(result.header, null, 2)} />
                    )}
                  </div>
                  <pre className="code-editor max-h-64 overflow-auto rounded-xl border border-border bg-card p-4 text-card-foreground">
                    {result.header &&
                      JSON.stringify(result.header, null, 2)}
                  </pre>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Payload</h3>
                    {result.payload && (
                      <CopyButton text={JSON.stringify(result.payload, null, 2)} />
                    )}
                  </div>
                  <pre className="code-editor max-h-64 overflow-auto rounded-xl border border-border bg-card p-4 text-card-foreground">
                    {result.payload &&
                      JSON.stringify(result.payload, null, 2)}
                  </pre>
                </div>

                <div className="lg:col-span-2 space-y-3 rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {result.payload?.iss && (
                      <div>
                        <span className="text-muted-foreground">Issuer: </span>
                        <span className="font-medium">{result.payload.iss}</span>
                      </div>
                    )}
                    {result.payload?.sub && (
                      <div>
                        <span className="text-muted-foreground">Subject: </span>
                        <span className="font-medium">{result.payload.sub}</span>
                      </div>
                    )}
                    {result.payload?.iat && (
                      <div>
                        <span className="text-muted-foreground">Issued: </span>
                        <span className="font-medium">
                          {formatDate(result.payload.iat)}
                        </span>
                      </div>
                    )}
                    {result.payload?.exp && (
                      <div>
                        <span className="text-muted-foreground">Expires: </span>
                        <span
                          className={`font-medium ${
                            result.expirationStatus === "Expired"
                              ? "text-error"
                              : "text-success"
                          }`}
                        >
                          {formatDate(result.payload.exp)} (
                          {result.expirationStatus})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
