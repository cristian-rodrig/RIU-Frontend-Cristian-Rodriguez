import { Routes } from '@angular/router';
import { HeroesPageComponent } from './features/heroes/pages/heroes-page/heroes-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesPageComponent },
];
