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
  const safeLang = SUPPORTED_LANGS.includes(lang as any) ? lang : "text";
  const h = await getHighlighter();
  return h.codeToHtml(code, {
    lang: safeLang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
