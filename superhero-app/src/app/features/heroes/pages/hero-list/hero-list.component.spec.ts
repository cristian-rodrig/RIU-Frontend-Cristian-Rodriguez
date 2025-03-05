import { TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../../../core/services/hero.service';
import { provideHttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('HeroListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HeroService,
        provideHttpClient(),
        { provide: MatDialog, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();
  });

  it('debería crearse el componente', () => {
    const fixture = TestBed.createComponent(HeroListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
