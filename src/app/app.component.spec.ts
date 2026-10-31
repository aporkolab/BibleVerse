import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the navbar, router outlet and footer', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-navbar')).not.toBeNull();
    expect(el.querySelector('router-outlet')).not.toBeNull();
    expect(el.querySelector('footer')?.textContent).toContain('Szentiras.hu');
  });

  it('toggles video playback', () => {
    const app = TestBed.createComponent(AppComponent).componentInstance;
    const video = { paused: true, play: vi.fn().mockResolvedValue(undefined), pause: vi.fn() };

    app.toggleVideo(video as unknown as HTMLMediaElement);
    expect(video.play).toHaveBeenCalled();

    video.paused = false;
    app.toggleVideo(video as unknown as HTMLMediaElement);
    expect(video.pause).toHaveBeenCalled();
  });
});
