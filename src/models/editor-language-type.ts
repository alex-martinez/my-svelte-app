export interface EditorLanguageOptions {
  html: string;
  javascript: string;
  css: string;
}

export type EditorLanguageType = keyof EditorLanguageOptions;
