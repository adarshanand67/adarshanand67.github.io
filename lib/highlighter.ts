import { createHighlighter, type Highlighter } from "shiki";

let _highlighter: Highlighter | null = null;

const SUPPORTED_LANGS = [
  "cpp", "c", "rust", "go", "python", "javascript", "typescript",
  "tsx", "jsx", "bash", "shell", "sh", "css", "html", "json",
  "yaml", "markdown", "text", "plaintext",
] as const;

export async function getHighlighter() {
  if (!_highlighter) {
    _highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [...SUPPORTED_LANGS],
    });
  }
  return _highlighter;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  type SupportedLang = (typeof SUPPORTED_LANGS)[number];
  const safeLang = (SUPPORTED_LANGS as readonly string[]).includes(lang) ? (lang as SupportedLang) : "text";
  const h = await getHighlighter();
  return h.codeToHtml(code, {
    lang: safeLang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
