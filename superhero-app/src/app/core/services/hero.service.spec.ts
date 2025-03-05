import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/heroe.model';
import { provideHttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(HeroService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar la lista de héroes con un array vacío', () => {
    expect(service.getHeroes()().length).toBe(0);
  });

  it('debería obtener un héroe por ID', () => {
    const hero: Hero = { 
      id: 1, 
      name: 'Superman', 
      powerstats: { intelligence: 100, strength: 100, speed: 100 }, 
      appearance: { gender: 'Male', eyeColor: 'Blue', height: ['6ft', '183cm'], weight: ['220lb', '100kg'] }, 
      biography: { fullName: 'Clark Kent', placeOfBirth: 'Krypton', publisher: 'DC Comics', aliases: [] }, 
      work: { occupation: 'Reporter', base: 'Metropolis' }, 
      connections: { groupAffiliation: 'Justice League', relatives: 'None' }, 
      images: { sm: '', md: '', lg: '' }, 
      slug: 'superman' 
    };

    service.addHero(hero);
    const result = service.getHeroById(1)();
    expect(result).toEqual(hero);
  });

  it('debería agregar un héroe a la lista', () => {
    const hero: Hero = { 
      id: 2, 
      name: 'Batman', 
      powerstats: { intelligence: 100, strength: 80, speed: 50 }, 
      appearance: { gender: 'Male', eyeColor: 'Brown', height: ['6ft 2in', '188cm'], weight: ['210lb', '95kg'] }, 
      biography: { fullName: 'Bruce Wayne', placeOfBirth: 'Gotham City', publisher: 'DC Comics', aliases: [] }, 
      work: { occupation: 'CEO', base: 'Gotham' }, 
      connections: { groupAffiliation: 'Justice League', relatives: 'Wayne Family' }, 
      images: { sm: '', md: '', lg: '' }, 
      slug: 'batman' 
    };

    service.addHero(hero);
    const heroes = service.getHeroes()();
    expect(heroes.length).toBe(1);
    expect(heroes[0].name).toBe('Batman');
  });

  it('debería actualizar un héroe existente', () => {
    const hero: Hero = { id: 3, name: 'Flash', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'flash' };
  
    service.addHero(hero);
  
    console.log("Lista antes de actualizar:", service.getHeroes()()); // 👀 Verificamos los héroes antes de actualizar
  
    service.updateHero({ ...hero, name: 'Flash Rebirth' });
  
    console.log("Lista después de actualizar:", service.getHeroes()()); // 👀 Verificamos si realmente cambió
  
    const result = service.getHeroById(3)();
    console.log("Resultado en el test después de actualizar:", result); // 👀 Vemos qué devuelve `getHeroById()`
  
    expect(result?.name).toBe('Flash Rebirth');
  });
  
  it('debería eliminar un héroe por ID', () => {
    const hero: Hero = { id: 4, name: 'Green Lantern', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'green-lantern' };
  
    service.addHero(hero);
    service.deleteHero(4);
    expect(service.getHeroes()().length).toBe(0);
  });
  
  it('debería filtrar héroes por nombre', () => {
    service.addHero({ id: 5, name: 'Spiderman', powerstats: { intelligence: 95, strength: 85, speed: 90 }, appearance: { gender: 'Male', eyeColor: 'Hazel', height: ['5ft 10in', '178cm'], weight: ['167lb', '76kg'] }, biography: { fullName: 'Peter Parker', placeOfBirth: 'Queens, New York', publisher: 'Marvel', aliases: [] }, work: { occupation: 'Photographer', base: 'New York' }, connections: { groupAffiliation: 'Avengers', relatives: 'Parker Family' }, images: { sm: '', md: '', lg: '' }, slug: 'spiderman' });

    service.addHero({ id: 6, name: 'Superman', powerstats: { intelligence: 100, strength: 100, speed: 100 }, appearance: { gender: 'Male', eyeColor: 'Blue', height: ['6ft', '183cm'], weight: ['220lb', '100kg'] }, biography: { fullName: 'Clark Kent', placeOfBirth: 'Krypton', publisher: 'DC Comics', aliases: [] }, work: { occupation: 'Reporter', base: 'Metropolis' }, connections: { groupAffiliation: 'Justice League', relatives: 'None' }, images: { sm: '', md: '', lg: '' }, slug: 'superman' });

    const filteredHeroes = service.searchHeroes('man')();
    expect(filteredHeroes.length).toBe(2);
    expect(filteredHeroes.some(hero => hero.name === 'Spiderman')).toBeTruthy();
    expect(filteredHeroes.some(hero => hero.name === 'Superman')).toBeTruthy();
  });

});
