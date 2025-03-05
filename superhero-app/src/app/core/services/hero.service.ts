import { Injectable, Signal, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/heroe.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes = signal<Hero[]>([]);

  constructor(private http: HttpClient) {}

  fetchHeroes() {
    this.http.get<Hero[]>('https://akabab.github.io/superhero-api/api/all.json')
      .subscribe(data => {
        this.heroes.set(data.slice(0, 120));
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
    const newHero = { ...hero, id: crypto.randomUUID() };
    this.heroes.update(heroes => [...heroes, newHero]);
  }

  updateHero(updatedHero: Hero) {
    this.heroes.update(heroes =>
      heroes.map(hero => (hero.id.toString() === updatedHero.id.toString() ? updatedHero : hero))
    );
  }

  deleteHero(id: string | number) {
    this.heroes.update(heroes => heroes.filter(hero => hero.id.toString() !== id.toString()));
  }
}
