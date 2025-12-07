export interface BibleBook {
  id: string;
  name: string;
  testament: string;
  order_index: number;
}

export interface BibleVerse {
  id: string;
  book_id: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  versions?: Record<string, string>;
  cross_references?: string[];
  themes?: string[];
}

export interface BibleVersion {
  code: string;
  name: string;
  language: string;
}

export const BIBLE_VERSIONS: BibleVersion[] = [
  { code: 'nbv', name: 'Nova Bíblia Viva', language: 'pt' },
  { code: 'web', name: 'World English Bible', language: 'en' },
  { code: 'kjv', name: 'King James Version', language: 'en' },
  { code: 'bsb', name: 'Berean Study Bible', language: 'en' },
];

export type Language = 'pt' | 'en';
