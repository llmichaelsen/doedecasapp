import { Masks } from './masks';
import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
@Directive({
  selector: '[appMask]'
})
export class MaskDirective {

  @Input('appMask') mask: string;

  constructor(private eleRef: ElementRef) {
  }

  @HostListener('input')
  onChange() {
    this.eleRef.nativeElement.value = Masks[this.mask](this.eleRef.nativeElement.value);
  }

}
