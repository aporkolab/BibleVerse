import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { BaseService } from '../../service/base.service';

import { SelectVerseComponent } from './select-verse.component';

describe('SelectVerseComponent', () => {
  let component: SelectVerseComponent;
  let getSelectedVerses: ReturnType<typeof vi.fn>;
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    getSelectedVerses = vi.fn().mockReturnValue(of({ text: 'Kezdetben teremtette Isten az eget és a földet.' }));
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    await TestBed.configureTestingModule({
      imports: [SelectVerseComponent],
      providers: [{ provide: BaseService, useValue: { getSelectedVerses } }],
    }).compileComponents();
    component = TestBed.createComponent(SelectVerseComponent).componentInstance;
  });

  afterEach(() => vi.restoreAllMocks());

  it('fetches a single verse and shows its text', () => {
    component.fromChapter.set(1);
    component.fromVerse.set(1);
    component.getSelectedVerses();
    expect(getSelectedVerses).toHaveBeenCalledWith('Ter', 1, 1, null, null);
    expect(component.finalText()).toContain('Kezdetben');
  });

  it('ignores stale range inputs when "Több vers" is unchecked', () => {
    component.fromChapter.set(2);
    component.fromVerse.set(3);
    component.toChapter.set(5);
    component.toVerse.set(1);
    component.getSelectedVerses();
    expect(getSelectedVerses).toHaveBeenCalledWith('Ter', 2, 3, null, null);
  });

  it('passes the range when "Több vers" is checked', () => {
    component.showInputs.set(true);
    component.selectedBook.set('Jn');
    component.fromChapter.set(3);
    component.fromVerse.set(16);
    component.toChapter.set(4);
    component.toVerse.set(2);
    component.getSelectedVerses();
    expect(getSelectedVerses).toHaveBeenCalledWith('Jn', 3, 16, 4, 2);
  });

  it.each([
    ['missing start', null, 1, null, null],
    ['end chapter before start', 3, 1, 2, 5],
    ['end verse before start in same chapter', 3, 10, 3, 5],
    ['end verse before start without end chapter', 3, 10, null, 5],
  ])('rejects invalid parameters (%s)', (_label, fromChapter, fromVerse, toChapter, toVerse) => {
    component.showInputs.set(true);
    component.fromChapter.set(fromChapter);
    component.fromVerse.set(fromVerse);
    component.toChapter.set(toChapter);
    component.toVerse.set(toVerse);
    component.getSelectedVerses();
    expect(alertSpy).toHaveBeenCalled();
    expect(getSelectedVerses).not.toHaveBeenCalled();
  });

  it('shows a not-found message for an empty API result', () => {
    getSelectedVerses.mockReturnValue(of([]));
    component.fromChapter.set(99);
    component.fromVerse.set(1);
    component.getSelectedVerses();
    expect(component.finalText()).toBe('Nincs ilyen igehely, kérem válasszon másikat!');
  });

  it('shows a not-found message on HTTP error', () => {
    getSelectedVerses.mockReturnValue(throwError(() => new Error('404')));
    component.fromChapter.set(1);
    component.fromVerse.set(1);
    component.getSelectedVerses();
    expect(component.finalText()).toBe('Nincs ilyen igehely, kérem válasszon másikat!');
  });
});
