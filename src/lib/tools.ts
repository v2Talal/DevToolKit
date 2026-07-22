export interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  category: "format" | "convert" | "generate" | "test";
  color: string;
}

export const tools: Tool[] = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting",
    href: "/tools/json-formatter",
    icon: "{ }",
    category: "format",
    color: "#3b82f6",
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens (JWT) headers and payloads",
    href: "/tools/jwt-decoder",
    icon: "🔐",
    category: "convert",
    color: "#8b5cf6",
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings for data transmission",
    href: "/tools/base64",
    icon: "🔄",
    category: "convert",
    color: "#06b6d4",
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions with real-time matching and highlighting",
    href: "/tools/regex-tester",
    icon: ".*",
    category: "test",
    color: "#f59e0b",
  },
  {
    id: "url-encoder",
    title: "URL Encoder/Decoder",
    description: "Encode and decode URL components and query parameters",
    href: "/tools/url-encoder",
    icon: "🔗",
    category: "convert",
    color: "#10b981",
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL, and other color formats",
    href: "/tools/color-converter",
    icon: "🎨",
    category: "convert",
    color: "#ec4899",
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes",
    href: "/tools/hash-generator",
    icon: "#",
    category: "generate",
    color: "#ef4444",
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups",
    href: "/tools/lorem-ipsum",
    icon: "¶",
    category: "generate",
    color: "#6366f1",
  },
];

export const categories = [
  { id: "all", label: "All Tools" },
  { id: "format", label: "Format" },
  { id: "convert", label: "Convert" },
  { id: "generate", label: "Generate" },
  { id: "test", label: "Test" },
];
