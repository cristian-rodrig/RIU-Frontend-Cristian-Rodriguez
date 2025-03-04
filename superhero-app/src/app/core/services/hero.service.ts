import { Injectable, Signal, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/heroe.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes = signal<Hero[]>([]); // Estado con señales

  constructor(private http: HttpClient) {}

  // Cargar los 60 héroes más famosos desde la API
  fetchHeroes() {
    this.http.get<Hero[]>('https://akabab.github.io/superhero-api/api/all.json')
      .subscribe(data => {
        this.heroes.set(data.slice(0, 120));
      });
  }

  // Obtener todos los héroes
  getHeroes(): Signal<Hero[]> {
    return this.heroes;
  }

  // Obtener un héroe por ID
  getHeroById(id: number): Signal<Hero | undefined> {
    return computed(() => this.heroes().find(hero => hero.id === id));
  }

  // Filtrar héroes por nombre
  searchHeroes(name: string): Signal<Hero[]> {
    return computed(() => this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    ));
  }

  // Agregar un nuevo héroe
  addHero(hero: Hero) {
    this.heroes.update(heroes => [...heroes, hero]);
  }

  // Editar un héroe existente
  updateHero(updatedHero: Hero) {
    this.heroes.update(heroes =>
      heroes.map(hero => (hero.id === updatedHero.id ? updatedHero : hero))
    );
  }

  // Eliminar un héroe
  deleteHero(id: number) {
    this.heroes.update(heroes => heroes.filter(hero => hero.id !== id));
  }
}
