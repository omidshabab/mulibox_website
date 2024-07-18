export const locales = ["en", "fa", "da"] as const;

export const defaultLocale: Locale = "en";

export type Locale = typeof locales[number];
