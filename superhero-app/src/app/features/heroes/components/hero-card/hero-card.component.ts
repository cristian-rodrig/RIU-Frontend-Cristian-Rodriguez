import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../../../core/models/heroe.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
  imports: [MatCardModule],
})
export class HeroCardComponent {
  hero: Hero;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: Hero }) {
    this.hero = data.hero;
  }
}
