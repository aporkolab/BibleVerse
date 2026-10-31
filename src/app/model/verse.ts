/** Response of the szentiras.hu `/api/ref/{reference}` endpoint. */
export interface Verse {
  canonicalRef: string;
  canonicalUrl: string;
  text: string;
  translationAbbrev: string;
  translationName: string;
}

/** One hit group of the szentiras.hu `/api/search/{word}` endpoint. */
export interface SearchResult {
  book: { name: string; abbrev: string };
  translation: { name: string; abbrev: string };
  verses: { chapter: number; numv: string; text: string }[];
}

export interface SearchResponse {
  fullTextResult?: {
    hitCount: number;
    results: SearchResult[];
  };
}

/** Entry of `assets/json/bible.json` (verse counts per chapter). */
export interface BibleBook {
  bookName: string;
  totalChapterNumber: number;
  book: string;
  chapterVersesNumber: { num: string; total: string }[];
}
