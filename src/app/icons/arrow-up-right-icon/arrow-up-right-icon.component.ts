import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow-up-right-icon',
  imports: [],
  template: `
    <svg 
      [attr.class]="className"
      width="800px" height="800px" 
      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H8M17 7V16" [attr.stroke]="strokeColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
    </svg>
  `,
  styles: ``
})
export class ArrowUpRightIconComponent {
  @Input() className: string = '';
  @Input() strokeColor: string ='currentColor'
}
