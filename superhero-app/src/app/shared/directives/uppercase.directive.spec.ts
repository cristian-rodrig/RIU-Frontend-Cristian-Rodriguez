import { ElementRef } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  it('debería crear una instancia', () => {
    const mockElementRef = { nativeElement: document.createElement('input') } as ElementRef;
    const directive = new UppercaseDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
