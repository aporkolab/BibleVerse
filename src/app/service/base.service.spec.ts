import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import bibleBooks from '../../assets/json/bible.json';
import { BibleBook } from '../model/verse';

import { BaseService, buildRandomReference, buildSelectedReference } from './base.service';

const sequence = (...values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

const book = (bookName: string, totals: number[]): BibleBook => ({
  bookName,
  book: bookName,
  totalChapterNumber: totals.length,
  chapterVersesNumber: totals.map((total, idx) => ({ num: String(idx + 1), total: String(total) })),
});

describe('buildRandomReference', () => {
  it('builds a single-chapter range reference', () => {
    const books = [book('Ter', [31, 25])];
    // book 0, chapter index 1 (=2), first verse 1 + floor(0 * 24) = 1, last = 2 + floor(0.5 * 24) = 14
    expect(buildRandomReference(books, sequence(0, 0.5, 0, 0.5))).toBe('Ter2,1-14');
  });

  it('never hangs or overflows when the first verse is the last but one verse', () => {
    const books = [book('Jo', [2])];
    expect(buildRandomReference(books, sequence(0.999, 0.999, 0.999, 0.999))).toBe('Jo1,1-2');
  });

  it('only picks chapters that have verse counts (Dán, Jo have fewer entries than chapters)', () => {
    const incomplete: BibleBook = { ...book('Dán', [10, 20]), totalChapterNumber: 14 };
    expect(buildRandomReference([incomplete], sequence(0, 0.999, 0, 0))).toMatch(/^Dán2,/);
  });

  it('always yields first < last <= chapter total for the real data set', () => {
    const books = bibleBooks as BibleBook[];
    for (let i = 0; i < 2000; i++) {
      const ref = buildRandomReference(books);
      const match = /^(.+?)(\d+),(\d+)-(\d+)$/u.exec(ref);
      expect(match, ref).not.toBeNull();
      const [, name, chapter, first, last] = match as RegExpExecArray;
      const entry = books.find(b => b.bookName === name)?.chapterVersesNumber.find(c => Number(c.num) === Number(chapter));
      expect(entry, ref).toBeDefined();
      expect(Number(first)).toBeGreaterThanOrEqual(1);
      expect(Number(first)).toBeLessThan(Number(last));
      expect(Number(last)).toBeLessThanOrEqual(Number(entry?.total));
    }
  });
});

describe('buildSelectedReference', () => {
  it('builds a single verse reference', () => {
    expect(buildSelectedReference('Jn', 3, 16)).toBe('Jn3,16');
  });

  it('builds a same-chapter range', () => {
    expect(buildSelectedReference('Jn', 3, 16, 3, 18)).toBe('Jn3,16-18');
    expect(buildSelectedReference('Jn', 3, 16, null, 18)).toBe('Jn3,16-18');
  });

  it('builds a cross-chapter range using the end verse (not the end chapter twice)', () => {
    expect(buildSelectedReference('Jn', 3, 16, 4, 2)).toBe('Jn3,16-4,2');
  });

  it('ignores an end chapter without an end verse', () => {
    expect(buildSelectedReference('Jn', 3, 16, 4, null)).toBe('Jn3,16');
  });
});

describe('BaseService', () => {
  let service: BaseService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BaseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the encoded reference for selected verses', () => {
    service.getSelectedVerses('Szám', 1, 2, 1, 5).subscribe();
    http.expectOne(`https://szentiras.hu/api/ref/${encodeURIComponent('Szám1,2-5')}`).flush({});
  });

  it('url-encodes and trims the search term', () => {
    service.getSearchedVerses('  Isten / Lelke? ').subscribe();
    http.expectOne('https://szentiras.hu/api/search/Isten%20%2F%20Lelke%3F').flush({});
  });

  it('requests a random reference', () => {
    service.getRandomVerse().subscribe();
    const req = http.expectOne(r => r.url.startsWith('https://szentiras.hu/api/ref/'));
    expect(decodeURIComponent(req.request.url)).toMatch(/\/ref\/.+\d+,\d+-\d+$/u);
    req.flush({});
  });
});
