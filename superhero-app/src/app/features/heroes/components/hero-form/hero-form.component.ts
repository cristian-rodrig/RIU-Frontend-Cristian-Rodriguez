import { Component, Input, OnChanges, SimpleChanges, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeroService } from '../../../../core/services/hero.service';
import { Hero } from '../../../../core/models/heroe.model';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';
import { SwalService } from '../../../../core/services/swal.service';

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
    UppercaseDirective,
  ],
})
export class HeroFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);
  private swalService = inject(SwalService);
  heroes: Signal<Hero[]> = this.heroService.getHeroes();

  @Input() hero!: Hero | null;

  heroForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    intelligence: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    strength: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    speed: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    gender: ['', Validators.required],
    eyeColor: ['', Validators.required],
    placeOfBirth: [''],
    publisher: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero']) {
      if (this.hero) {
        // EDIT
        this.heroForm.patchValue({
          name: this.hero.name || '',
          intelligence: this.hero.powerstats?.intelligence || '',
          strength: this.hero.powerstats?.strength || '',
          speed: this.hero.powerstats?.speed || '',
          gender: this.hero.appearance?.gender || '',
          eyeColor: this.hero.appearance?.eyeColor || '',
          placeOfBirth: this.hero.biography?.placeOfBirth || '',
          publisher: this.hero.biography?.publisher || '',
        });
      } else {
        this.heroForm.reset();
      }
    }
  }
  
  

  saveHero() {
    if (this.heroForm.invalid) return;

    const heroData: Hero = {
      id: this.hero?.id ?? crypto.randomUUID(),
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
        sm: ['assets/images/default-hero.png'],
        md: ['assets/images/default-hero.png'],
        lg: ['assets/images/default-hero.png'],
      },
      slug: this.heroForm.value.name.toLowerCase().replace(/ /g, '-'),
    };

    if (this.hero) {
      this.heroService.updateHero(heroData);
      this.swalService.success('Héroe actualizado');
    } else {
      this.heroService.addHero(heroData);
      this.swalService.success('Nuevo héroe creado');
    }

    this.heroService.stopEditing();
  }

  cancel() {
    this.heroService.stopEditing();
  }
}
