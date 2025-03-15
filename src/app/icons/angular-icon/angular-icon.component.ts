import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  imports: [],
  template: `
    <svg [attr.class]="className" width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Angular</title>
      <path
        d="M32.125 7.375L31 24.375L20.625 2L32.125 7.375ZM24.875 29.375L17.125 33.875L9.25 29.375L10.75 25.5H23.375L24.875 29.375ZM17.125 10.5L21.125 20.5H13L17.125 10.5ZM3.125 24.375L2 7.375L13.5 2L3.125 24.375Z"
        [attr.fill]="fillColor" />
      <path
        d="M32.125 7.375L31 24.375L20.625 2L32.125 7.375ZM24.875 29.375L17.125 33.875L9.25 29.375L10.75 25.5H23.375L24.875 29.375ZM17.125 10.5L21.125 20.5H13L17.125 10.5ZM3.125 24.375L2 7.375L13.5 2L3.125 24.375Z"
        [attr.fill]="fillColor"  />
    </svg>
  `,
  styles: ``
})
export class AngularIconComponent {
  @Input() className: string = '';
  @Input() fillColor: string ='currentColor'
}
