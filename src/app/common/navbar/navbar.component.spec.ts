import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  it('links to every page', async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();

    const hrefs = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a.nav-link')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(['/randomVerse', '/selectVerse', '/searchVerse', '/contact']);
  });
});
