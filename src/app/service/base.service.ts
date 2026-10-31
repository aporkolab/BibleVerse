import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import bibleBooks from '../../assets/json/bible.json';
import { BibleBook, SearchResponse, Verse } from '../model/verse';

/**
 * Builds a random reference of at least two consecutive verses within one chapter,
 * e.g. `Ter1,3-7`. `random` must return values in [0, 1) like `Math.random`.
 */
export const buildRandomReference = (books: readonly BibleBook[], random: () => number = Math.random): string => {
  const book = books[Math.floor(random() * books.length)];
  const chapterIndex = Math.floor(random() * book.chapterVersesNumber.length);
  const chapter = book.chapterVersesNumber[chapterIndex];
  const totalVerses = Number(chapter.total);

  const firstVerse = 1 + Math.floor(random() * (totalVerses - 1));
  const lastVerse = firstVerse + 1 + Math.floor(random() * (totalVerses - firstVerse));

  return `${book.bookName}${Number(chapter.num)},${firstVerse}-${lastVerse}`;
};

/** Builds a szentiras.hu reference such as `Jn3,16`, `Jn3,16-18` or `Jn3,16-4,2`. */
export const buildSelectedReference = (
  book: string,
  fromChapter: number,
  fromVerse: number,
  toChapter?: number | null,
  toVerse?: number | null
): string => {
  let reference = `${book}${fromChapter},${fromVerse}`;
  if (toVerse) {
    reference += !toChapter || toChapter === fromChapter ? `-${toVerse}` : `-${toChapter},${toVerse}`;
  }
  return reference;
};

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.api.baseUrl;
  private readonly books = bibleBooks as BibleBook[];

  getRandomVerse(): Observable<Verse> {
    return this.getReference(buildRandomReference(this.books));
  }

  getSelectedVerses(
    book: string,
    fromChapter: number,
    fromVerse: number,
    toChapter?: number | null,
    toVerse?: number | null
  ): Observable<Verse> {
    return this.getReference(buildSelectedReference(book, fromChapter, fromVerse, toChapter, toVerse));
  }

  getSearchedVerses(word: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}/search/${encodeURIComponent(word.trim())}`);
  }

  private getReference(reference: string): Observable<Verse> {
    return this.http.get<Verse>(`${this.apiUrl}/ref/${encodeURIComponent(reference)}`);
  }
}
