import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { SearchResult } from '../../model/verse';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-search-verse',
  imports: [FormsModule],
  templateUrl: './search-verse.component.html',
  styleUrl: './search-verse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchVerseComponent {
  private readonly baseService = inject(BaseService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchWord = signal('');
  readonly hitCount = signal(0);
  readonly verseData = signal<SearchResult[] | null>(null);
  readonly errorMessage = signal('');

  search(word: string): void {
    this.verseData.set(null);
    this.hitCount.set(0);
    this.errorMessage.set('');

    if (!word.trim()) {
      this.errorMessage.set('Kérem adjon meg egy keresési kifejezést!');
      return;
    }

    this.baseService
      .getSearchedVerses(word)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.verseData.set(data.fullTextResult?.results ?? []);
          this.hitCount.set(data.fullTextResult?.hitCount ?? 0);
        },
        error: (e: unknown) => {
          console.error(e);
          this.errorMessage.set('A keresés sikertelen, kérem próbálja újra később!');
        },
      });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
