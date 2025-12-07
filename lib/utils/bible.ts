import { Language } from '../types/bible';

export function getDefaultVersion(lang: Language): string {
  return lang === 'pt' ? 'nbv' : 'web';
}

export function formatVerseReference(
  bookName: string,
  chapter: number,
  verse: number
): string {
  return `${bookName} ${chapter}:${verse}`;
}

export function parseVerseId(verseId: string): {
  bookId: string;
  chapter: number;
  verse: number;
} | null {
  const match = verseId.match(/^([a-z0-9]+)_(\d+)_(\d+)$/);
  if (!match) return null;
  
  return {
    bookId: match[1],
    chapter: parseInt(match[2]),
    verse: parseInt(match[3]),
  };
}

export function createVerseId(
  bookId: string,
  chapter: number,
  verse: number
): string {
  return `${bookId}_${chapter}_${verse}`;
}

export const BOOK_NAMES: Record<string, { pt: string; en: string }> = {
  gen: { pt: 'Gênesis', en: 'Genesis' },
  exo: { pt: 'Êxodo', en: 'Exodus' },
  lev: { pt: 'Levítico', en: 'Leviticus' },
  num: { pt: 'Números', en: 'Numbers' },
  deu: { pt: 'Deuteronômio', en: 'Deuteronomy' },
  jos: { pt: 'Josué', en: 'Joshua' },
  jdg: { pt: 'Juízes', en: 'Judges' },
  rut: { pt: 'Rute', en: 'Ruth' },
  '1sa': { pt: '1 Samuel', en: '1 Samuel' },
  '2sa': { pt: '2 Samuel', en: '2 Samuel' },
  '1ki': { pt: '1 Reis', en: '1 Kings' },
  '2ki': { pt: '2 Reis', en: '2 Kings' },
  '1ch': { pt: '1 Crônicas', en: '1 Chronicles' },
  '2ch': { pt: '2 Crônicas', en: '2 Chronicles' },
  ezr: { pt: 'Esdras', en: 'Ezra' },
  neh: { pt: 'Neemias', en: 'Nehemiah' },
  est: { pt: 'Ester', en: 'Esther' },
  job: { pt: 'Jó', en: 'Job' },
  psa: { pt: 'Salmos', en: 'Psalms' },
  pro: { pt: 'Provérbios', en: 'Proverbs' },
  ecc: { pt: 'Eclesiastes', en: 'Ecclesiastes' },
  sng: { pt: 'Cantares', en: 'Song of Solomon' },
  isa: { pt: 'Isaías', en: 'Isaiah' },
  jer: { pt: 'Jeremias', en: 'Jeremiah' },
  lam: { pt: 'Lamentações', en: 'Lamentations' },
  ezk: { pt: 'Ezequiel', en: 'Ezekiel' },
  dan: { pt: 'Daniel', en: 'Daniel' },
  hos: { pt: 'Oséias', en: 'Hosea' },
  jol: { pt: 'Joel', en: 'Joel' },
  amo: { pt: 'Amós', en: 'Amos' },
  oba: { pt: 'Obadias', en: 'Obadiah' },
  jon: { pt: 'Jonas', en: 'Jonah' },
  mic: { pt: 'Miquéias', en: 'Micah' },
  nam: { pt: 'Naum', en: 'Nahum' },
  hab: { pt: 'Habacuque', en: 'Habakkuk' },
  zep: { pt: 'Sofonias', en: 'Zephaniah' },
  hag: { pt: 'Ageu', en: 'Haggai' },
  zec: { pt: 'Zacarias', en: 'Zechariah' },
  mal: { pt: 'Malaquias', en: 'Malachi' },
  mat: { pt: 'Mateus', en: 'Matthew' },
  mrk: { pt: 'Marcos', en: 'Mark' },
  luk: { pt: 'Lucas', en: 'Luke' },
  jhn: { pt: 'João', en: 'John' },
  act: { pt: 'Atos', en: 'Acts' },
  rom: { pt: 'Romanos', en: 'Romans' },
  '1co': { pt: '1 Coríntios', en: '1 Corinthians' },
  '2co': { pt: '2 Coríntios', en: '2 Corinthians' },
  gal: { pt: 'Gálatas', en: 'Galatians' },
  eph: { pt: 'Efésios', en: 'Ephesians' },
  php: { pt: 'Filipenses', en: 'Philippians' },
  col: { pt: 'Colossenses', en: 'Colossians' },
  '1th': { pt: '1 Tessalonicenses', en: '1 Thessalonians' },
  '2th': { pt: '2 Tessalonicenses', en: '2 Thessalonians' },
  '1ti': { pt: '1 Timóteo', en: '1 Timothy' },
  '2ti': { pt: '2 Timóteo', en: '2 Timothy' },
  tit: { pt: 'Tito', en: 'Titus' },
  phm: { pt: 'Filemom', en: 'Philemon' },
  heb: { pt: 'Hebreus', en: 'Hebrews' },
  jas: { pt: 'Tiago', en: 'James' },
  '1pe': { pt: '1 Pedro', en: '1 Peter' },
  '2pe': { pt: '2 Pedro', en: '2 Peter' },
  '1jn': { pt: '1 João', en: '1 John' },
  '2jn': { pt: '2 João', en: '2 John' },
  '3jn': { pt: '3 João', en: '3 John' },
  jud: { pt: 'Judas', en: 'Jude' },
  rev: { pt: 'Apocalipse', en: 'Revelation' },
};

export function getBookName(bookId: string, lang: Language): string {
  return BOOK_NAMES[bookId]?.[lang] || bookId;
}
