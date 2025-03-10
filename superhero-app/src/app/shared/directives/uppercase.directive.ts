import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input') onInput() {
    const input = this.el.nativeElement as HTMLInputElement;
    const uppercased = input.value.toUpperCase();
    input.value = uppercased;

    if (this.control && this.control.control) {
      this.control.control.setValue(uppercased, { emitEvent: false });
    }
  }
}

