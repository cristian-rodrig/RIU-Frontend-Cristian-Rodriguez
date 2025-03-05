import { Component, OnInit, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../../../core/services/hero.service';
import { Hero } from '../../../../core/models/heroe.model';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class HeroFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);

  heroForm!: FormGroup;
  heroId: string | null = null;
  heroes: Signal<Hero[]> = this.heroService.getHeroes();

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      intelligence: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      strength: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      speed: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      gender: ['', Validators.required],
      eyeColor: ['', Validators.required],
      placeOfBirth: [''],
      publisher: [''],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.heroId = id;
        const hero = this.heroes().find(h => h.id.toString() === id);
        if (hero) {
          this.heroForm.patchValue({
            name: hero.name,
            intelligence: hero.powerstats.intelligence,
            strength: hero.powerstats.strength,
            speed: hero.powerstats.speed,
            gender: hero.appearance.gender,
            eyeColor: hero.appearance.eyeColor,
            placeOfBirth: hero.biography.placeOfBirth,
            publisher: hero.biography.publisher,
          });
        }
      }
    });
  }

  saveHero() {
    if (this.heroForm.invalid) return;

    const heroData: Hero = {
      id: this.heroId ?? crypto.randomUUID(),
      name: this.heroForm.value.name,
      powerstats: {
        intelligence: this.heroForm.value.intelligence,
        strength: this.heroForm.value.strength,
        speed: this.heroForm.value.speed,
      },
      appearance: {
        gender: this.heroForm.value.gender,
        eyeColor: this.heroForm.value.eyeColor,
        height: ['Unknown', 'Unknown'],
        weight: ['Unknown', 'Unknown'],
      },
      biography: {
        fullName: this.heroForm.value.name,
        placeOfBirth: this.heroForm.value.placeOfBirth || 'Desconocido',
        publisher: this.heroForm.value.publisher || 'Desconocido',
        aliases: [],
      },
      work: {
        occupation: 'Desconocida',
        base: 'Desconocida',
      },
      connections: {
        groupAffiliation: 'Desconocida',
        relatives: 'Desconocida',
      },
      images: {
        sm: 'https://via.placeholder.com/80',
        md: 'https://via.placeholder.com/150',
        lg: 'https://via.placeholder.com/300',
      },
      slug: this.heroForm.value.name.toLowerCase().replace(/ /g, '-'),
    };

    if (this.heroId) {
      this.heroService.updateHero(heroData);
    } else {
      this.heroService.addHero(heroData);
    }

    this.router.navigate(['/']);
  }
}
