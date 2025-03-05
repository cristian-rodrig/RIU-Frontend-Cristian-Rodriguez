import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[uppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}

