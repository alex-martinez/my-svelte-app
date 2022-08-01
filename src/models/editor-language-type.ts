export interface EditorLanguageOptions {
  html: string;
  javascript: string;
  css: string;
  head: string;
}

export type EditorLanguageType = keyof EditorLanguageOptions;
