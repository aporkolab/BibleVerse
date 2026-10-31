import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { Verse } from '../../model/verse';
import { BaseService } from '../../service/base.service';

import { RandomVerseComponent } from './random-verse.component';

const verse: Verse = {
  canonicalRef: 'Jn3,16-17',
  canonicalUrl: 'https://szentiras.hu/Jn3,16-17',
  text: 'Mert úgy szerette Isten a világot...',
  translationAbbrev: 'KNB',
  translationName: 'Káldi–Neovulgata',
};

const setup = async (getRandomVerse: () => unknown) => {
  await TestBed.configureTestingModule({
    imports: [RandomVerseComponent],
    providers: [{ provide: BaseService, useValue: { getRandomVerse } }],
  }).compileComponents();
  const fixture = TestBed.createComponent(RandomVerseComponent);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
};

describe('RandomVerseComponent', () => {
  it('renders the loaded verse and its reference', async () => {
    const el = await setup(() => of(verse));
    expect(el.textContent).toContain(verse.text);
    expect(el.querySelector('.highlight')?.textContent).toBe('Jn3,16-17');
  });

  it('shows an error message when the request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const el = await setup(() => throwError(() => new Error('offline')));
    expect(el.querySelector('.error-message')?.textContent).toContain('Nem sikerült');
  });

  it('shows an error message when the API returns an empty result', async () => {
    const el = await setup(() => of([]));
    expect(el.querySelector('.error-message')).not.toBeNull();
    expect(el.querySelector('h2')).toBeNull();
  });
});
