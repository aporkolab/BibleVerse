import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { BaseService } from '../../service/base.service';

interface BookOption {
  value: string;
  display: string;
}

const INVALID_PARAMS = 'Érvénytelen paraméterek. Kérem ellenőrizze!';
const NOT_FOUND = 'Nincs ilyen igehely, kérem válasszon másikat!';

@Component({
  selector: 'app-select-verse',
  imports: [FormsModule],
  templateUrl: './select-verse.component.html',
  styleUrl: './select-verse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectVerseComponent {
  private readonly baseService = inject(BaseService);
  private readonly destroyRef = inject(DestroyRef);

  readonly books: readonly BookOption[] = [
    { value: 'Ter', display: 'Teremtés könyve' },
    { value: 'Kiv', display: 'Kivonulás könyve' },
    { value: 'Lev', display: 'Leviták könyve' },
    { value: 'Szám', display: 'Számok könyve' },
    { value: 'MTörv', display: 'Második Törvénykönyv' },
    { value: 'Józs', display: 'Józsue könyve' },
    { value: 'Bír', display: 'Bírák könyve' },
    { value: 'Rút', display: 'Rút könyve' },
    { value: '1Sám', display: 'Sámuel első könyve' },
    { value: '2Sám', display: 'Sámuel második könyve' },
    { value: '1Kir', display: 'Királyok első könyve' },
    { value: '2Kir', display: 'Királyok második könyve' },
    { value: '1Krón', display: 'A krónikák első könyve' },
    { value: '2Krón', display: 'Krónikák második könyve' },
    { value: 'Ezdr', display: 'Ezdrás könyve' },
    { value: 'Neh', display: 'Nehemiás könyve' },
    { value: 'Tób', display: 'Tóbiás könyve' },
    { value: 'Judit', display: 'Judit könyve' },
    { value: 'Eszt', display: 'Eszter könyve' },
    { value: 'Jób', display: 'Jób könyve' },
    { value: 'Zsolt', display: 'A zsoltárok könyve' },
    { value: 'Péld', display: 'A példabeszédek könyve' },
    { value: 'Préd', display: 'A Prédikátor könyve' },
    { value: 'Én', display: 'Az énekek éneke' },
    { value: 'Bölcs', display: 'A bölcsesség könyve' },
    { value: 'Sír', display: 'Jézus, Sirák fiának könyve' },
    { value: 'Iz', display: 'Izajás könyve' },
    { value: 'Jer', display: 'Jeremiás könyve' },
    { value: 'Siralm', display: 'Jeremiás siralmai' },
    { value: 'Bár', display: 'Báruk könyve' },
    { value: 'Ez', display: 'Ezekiel jövendölése' },
    { value: 'Dán', display: 'Dániel jövendölése' },
    { value: 'Óz', display: 'Ózeás jövendölése' },
    { value: 'Jo', display: 'Joel jövendölése' },
    { value: 'Ám', display: 'Ámosz jövendölése' },
    { value: 'Abd', display: 'Abdiás jövendölése' },
    { value: 'Jón', display: 'Jónás jövendölése' },
    { value: 'Mik', display: 'Mikeás jövendölése' },
    { value: 'Náh', display: 'Náhum jövendölése' },
    { value: 'Hab', display: 'Habakuk jövendölése' },
    { value: 'Szof', display: 'Szofoniás jövendölése' },
    { value: 'Agg', display: 'Aggeus jövendölése' },
    { value: 'Zak', display: 'Zakariás jövendölése' },
    { value: 'Mal', display: 'Malakiás jövendölése' },
    { value: '1Makk', display: 'A Makkabeusok első könyve' },
    { value: '2Makk', display: 'A Makkabeusok második könyve' },
    { value: 'Mt', display: 'Evangélium Máté szerint' },
    { value: 'Mk', display: 'Evangélium Márk szerint' },
    { value: 'Lk', display: 'Evangélium Lukács szerint' },
    { value: 'Jn', display: 'Evangélium János szerint' },
    { value: 'Csel', display: 'Az apostolok cselekedetei' },
    { value: 'Róm', display: 'A rómaiaknak írt levél' },
    { value: '1Kor', display: 'Első levél a korintusiaknak' },
    { value: '2Kor', display: 'Második levél a korintusiaknak' },
    { value: 'Gal', display: 'Levél a galatáknak' },
    { value: 'Ef', display: 'Levél az efezusiaknak' },
    { value: 'Fil', display: 'Levél a filippieknek' },
    { value: 'Kol', display: 'Levél a kolosszeieknek' },
    { value: '1Tessz', display: 'Első levél a tesszalonikieknek' },
    { value: '2Tessz', display: 'Második levél a tesszalonikieknek' },
    { value: '1Tim', display: 'Első levél Timóteusnak' },
    { value: '2Tim', display: 'Második levél Timóteusnak' },
    { value: 'Tít', display: 'Levél Títusznak' },
    { value: 'Filem', display: 'Levél Filemonnak' },
    { value: 'Zsid', display: 'Levél a zsidóknak' },
    { value: 'Jak', display: 'Jakab levele' },
    { value: '1Pét', display: 'Péter első levele' },
    { value: '2Pét', display: 'Péter második levele' },
    { value: '1Ján', display: 'János első levele' },
    { value: '2Ján', display: 'János második levele' },
    { value: '3Ján', display: 'János harmadik levele' },
    { value: 'Júd', display: 'Júdás levele' },
    { value: 'Jel', display: 'János jelenései' },
  ];

  readonly showInputs = signal(false);
  readonly selectedBook = signal(this.books[0].value);
  readonly fromChapter = signal<number | null>(null);
  readonly fromVerse = signal<number | null>(null);
  readonly toChapter = signal<number | null>(null);
  readonly toVerse = signal<number | null>(null);
  readonly finalText = signal('');

  getSelectedVerses(): void {
    this.finalText.set('');

    const book = this.selectedBook();
    const fromChapter = this.fromChapter();
    const fromVerse = this.fromVerse();
    const toChapter = this.showInputs() ? this.toChapter() : null;
    const toVerse = this.showInputs() ? this.toVerse() : null;

    if (!fromChapter || !fromVerse || fromChapter < 1 || fromVerse < 1) {
      alert(INVALID_PARAMS);
      return;
    }
    if (toChapter && toChapter < fromChapter) {
      alert(INVALID_PARAMS);
      return;
    }
    if ((!toChapter || toChapter === fromChapter) && toVerse && toVerse < fromVerse) {
      alert(INVALID_PARAMS);
      return;
    }

    this.baseService
      .getSelectedVerses(book, fromChapter, fromVerse, toChapter, toVerse)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => this.finalText.set(data?.text || NOT_FOUND),
        error: () => this.finalText.set(NOT_FOUND),
      });
  }
}
