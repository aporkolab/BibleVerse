import { TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  it('credits the szentiras.hu API', async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('a[href="https://szentiras.hu"]')).not.toBeNull();
  });
});
