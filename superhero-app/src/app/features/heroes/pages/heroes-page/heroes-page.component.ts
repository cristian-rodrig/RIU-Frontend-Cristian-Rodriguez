import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [CommonModule, HeroListComponent, HeroFormComponent],
  templateUrl: './heroes-page.component.html',
  styleUrls: ['./heroes-page.component.scss'],
})
export class HeroesPageComponent {
  heroService = inject(HeroService);
}
