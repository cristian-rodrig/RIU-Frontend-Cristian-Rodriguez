import { Injectable, Signal, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/heroe.model';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes = signal<Hero[]>([]);
  private swalService = inject(SwalService);

  constructor(private http: HttpClient) {}

  fetchHeroes() {
    this.http.get<Hero[]>('https://akabab.github.io/superhero-api/api/all.json')
      .subscribe(data => {
        this.heroes.set(data);
      });
  }

  getHeroes(): Signal<Hero[]> {
    return this.heroes;
  }

  getHeroById(id: string | number): Signal<Hero | undefined> {
    return computed(() => this.heroes().find(hero => hero.id.toString() === id.toString()));
  }

  searchHeroes(name: string): Signal<Hero[]> {
    return computed(() => this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    ));
  }

  addHero(hero: Hero) {
    this.heroes.update(heroes => {
      const newHero = {
        ...hero,
        id: hero.id ?? crypto.randomUUID(),
        images: hero.images ?? {
          sm: 'assets/images/default-hero.png',
          md: 'assets/images/default-hero.png',
          lg: 'assets/images/default-hero.png',
        }
      };
      this.swalService.success('Nuevo héroe agregado satisfactoriamente');
      return [newHero, ...heroes];
    });
  }
  
  updateHero(updatedHero: Hero) {
    this.heroes.set(
      this.heroes().map(hero =>
        hero.id.toString() === updatedHero.id.toString()
          ? { ...updatedHero, images: hero.images }
          : hero
      )
    );
  }
  

  deleteHero(id: string | number) {
    this.heroes.update(heroes => heroes.filter(hero => hero.id.toString() !== id.toString()));
  }
  
}
