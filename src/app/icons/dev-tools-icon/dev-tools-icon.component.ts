import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dev-tools-icon',
  imports: [],
  template: `
    <svg 
      [attr.class]="className" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
      [attr.stroke]="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-devices-code">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13 15.5v-6.5a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v4m0 6a1 1 0 0 1 -1 1" />
      <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h7" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
      <path d="M16 9h2" />
    </svg>
  `,
  styles: ``
})
export class DevToolsIconComponent {
  @Input() className: string = '';
  @Input() strokeColor: string ='currentColor'
}
