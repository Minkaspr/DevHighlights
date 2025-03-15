import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-framework-icon',
  imports: [],
  template: `
    <svg 
      [attr.class]="className" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      [attr.stroke]="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-layers-linked">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 8.268a2 2 0 0 1 1 1.732v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h3" />
      <path d="M5 15.734a2 2 0 0 1 -1 -1.734v-8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-3" />
    </svg>
  `,
  styles: ``
})
export class FrameworkIconComponent {
  @Input() className: string = '';
  @Input() strokeColor: string ='currentColor'
}
