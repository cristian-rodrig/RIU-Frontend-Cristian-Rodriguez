import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  it('debería crear una instancia', () => {
    const mockElementRef = { nativeElement: document.createElement('input') } as ElementRef;
    const mockNgControl = {} as NgControl;
    const directive = new UppercaseDirective(mockElementRef, mockNgControl);
    expect(directive).toBeTruthy();
  });
});
