import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-device-laptop-icon',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" 
      [attr.class]="className"
      width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-device-laptop">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 19l18 0" />
      <path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
    </svg>
  `,
  styles: ``
})
export class DeviceLaptopIconComponent {
  @Input() className: string = '';
}
