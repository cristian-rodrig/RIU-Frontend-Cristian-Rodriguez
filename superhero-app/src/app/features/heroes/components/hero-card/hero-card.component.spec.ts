import { TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('HeroCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();
  });

  it('debería crearse el componente', () => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
