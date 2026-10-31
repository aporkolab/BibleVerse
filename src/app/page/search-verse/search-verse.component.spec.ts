import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { SearchResponse } from '../../model/verse';
import { BaseService } from '../../service/base.service';

import { SearchVerseComponent } from './search-verse.component';

const response: SearchResponse = {
  fullTextResult: {
    hitCount: 2,
    results: [
      {
        book: { name: 'Teremtés könyve', abbrev: 'Ter' },
        translation: { name: 'Káldi–Neovulgata', abbrev: 'KNB' },
        verses: [
          { chapter: 1, numv: '2', text: 'Isten Lelke a vizek felett lebegett.' },
          { chapter: 1, numv: '3', text: 'Legyen világosság!' },
        ],
      },
    ],
  },
};

describe('SearchVerseComponent', () => {
  let fixture: ComponentFixture<SearchVerseComponent>;
  let getSearchedVerses: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getSearchedVerses = vi.fn();
    await TestBed.configureTestingModule({
      imports: [SearchVerseComponent],
      providers: [{ provide: BaseService, useValue: { getSearchedVerses } }],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchVerseComponent);
    await fixture.whenStable();
  });

  it('does not call the API for a blank search term', async () => {
    fixture.componentInstance.search('   ');
    await fixture.whenStable();
    expect(getSearchedVerses).not.toHaveBeenCalled();
    expect((fixture.nativeElement as HTMLElement).querySelector('.error-message')).not.toBeNull();
  });

  it('renders one row per returned verse and the hit count', async () => {
    getSearchedVerses.mockReturnValue(of(response));
    fixture.componentInstance.search('Isten');
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(getSearchedVerses).toHaveBeenCalledWith('Isten');
    expect(el.querySelectorAll('tbody tr').length).toBe(2);
    expect(el.textContent).toContain('Az összes találat száma: 2');
  });

  it('handles a response without full text results', async () => {
    getSearchedVerses.mockReturnValue(of({}));
    fixture.componentInstance.search('xyz');
    await fixture.whenStable();
    expect(fixture.componentInstance.hitCount()).toBe(0);
    expect(fixture.componentInstance.verseData()).toEqual([]);
  });

  it('shows an error message when the request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    getSearchedVerses.mockReturnValue(throwError(() => new Error('500')));
    fixture.componentInstance.search('Isten');
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.error-message')?.textContent).toContain('sikertelen');
  });
});
