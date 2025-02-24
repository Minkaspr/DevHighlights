import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutSide]'
})
export class ClickOutSideDirective {

  /**
   * clickOutside: Emite un evento cuando se hace clic fuera del elemento al que está aplicada la directiva.
   * isActive: Activa o desactiva la directiva. Si es `true`, el evento `clickOutside` se emitirá.
   * Por defecto es `false`.
   */
  @Output() clickOutside = new EventEmitter<void>();
  @Input() isActive: boolean = false;

  constructor(private elementRef: ElementRef) { }

  /**
    * Maneja el evento de clic en el documento.
    * Si el clic es fuera del elemento y la directiva está activa, emite `clickOutside`.
    * @param targetElement El elemento que recibió el clic.
    */
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (this.isActive && !clickedInside) {
      this.clickOutside.emit();
    }
  }
}
