import { Routes } from '@angular/router';

import { ContactComponent } from './page/contact/contact.component';
import { RandomVerseComponent } from './page/random-verse/random-verse.component';
import { SearchVerseComponent } from './page/search-verse/search-verse.component';
import { SelectVerseComponent } from './page/select-verse/select-verse.component';

export const routes: Routes = [
  { path: '', component: RandomVerseComponent },
  { path: 'randomVerse', component: RandomVerseComponent },
  { path: 'selectVerse', component: SelectVerseComponent },
  { path: 'searchVerse', component: SearchVerseComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
