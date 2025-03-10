import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../../../core/services/hero.service';
import { SwalService } from '../../../../core/services/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let swalService: jasmine.SpyObj<SwalService>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'fetchHeroes', 'deleteHero']);
    const swalServiceSpy = jasmine.createSpyObj('SwalService', ['confirmDelete']);

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, HeroListComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: SwalService, useValue: swalServiceSpy },
        provideHttpClient(),
        { provide: MatDialog, useValue: {} },
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    swalService = TestBed.inject(SwalService) as jasmine.SpyObj<SwalService>;

    heroService.getHeroes.and.returnValue(signal([
      { id: 1, name: 'Superman', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'superman' },
      { id: 2, name: 'Batman', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'batman' }
    ]));
    component.heroes = heroService.getHeroes();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a fetchHeroes si no hay héroes en memoria', () => {
    heroService.getHeroes.and.returnValue(signal([]));
    component.heroes = signal([]);
    fixture.detectChanges();
    expect(heroService.fetchHeroes).toHaveBeenCalled();
  });
  
  it('debería ejecutar deleteHero() con confirmación de SweetAlert', async () => {
    swalService.confirmDelete.and.returnValue(Promise.resolve(true));  
    await component.deleteHero(1);
    expect(heroService.deleteHero).toHaveBeenCalledWith(1);
  });  
});