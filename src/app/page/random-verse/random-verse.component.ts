import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Verse } from '../../model/verse';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-random-verse',
  templateUrl: './random-verse.component.html',
  styleUrl: './random-verse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomVerseComponent implements OnInit {
  private readonly baseService = inject(BaseService);
  private readonly destroyRef = inject(DestroyRef);

  readonly randVerse = signal<Verse | null>(null);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.baseService
      .getRandomVerse()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          if (data?.text) {
            this.randVerse.set(data);
          } else {
            this.errorMessage.set('Nem sikerült igehelyet betölteni, kérem frissítse az oldalt!');
          }
        },
        error: (e: unknown) => {
          console.error(e);
          this.errorMessage.set('Nem sikerült igehelyet betölteni, kérem frissítse az oldalt!');
        },
      });
  }
}
