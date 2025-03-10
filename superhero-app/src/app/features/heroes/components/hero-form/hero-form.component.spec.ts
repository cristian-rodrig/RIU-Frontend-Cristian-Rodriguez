import { TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { HeroService } from '../../../../core/services/hero.service';
import { provideHttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('HeroFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        HeroService,
        provideHttpClient(),
        FormBuilder,
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: { paramMap: { subscribe: () => {} } } },
      ],
    }).compileComponents();
  });

  it('debería crearse el componente', () => {
    const fixture = TestBed.createComponent(HeroFormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
