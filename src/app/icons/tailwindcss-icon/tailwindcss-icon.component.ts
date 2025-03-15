import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tailwindcss-icon',
  imports: [],
  template: `
    <svg fill="none" [attr.stroke]="strokeColor" [attr.class]="className" width="24" height="24"
      viewBox="0 0 24 24" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-brand-tailwind" xmlns="http://www.w3.org/2000/svg">
      <title>TailwindCSS</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z" />
    </svg>
  `,
  styles: ``
})
export class TailwindcssIconComponent {
  @Input() className: string = '';
  @Input() strokeColor: string = 'currentColor';
  @Input() fillColor: string ='none'
}
