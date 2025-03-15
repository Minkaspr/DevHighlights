import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-skill',
  imports: [],
  templateUrl: './card-skill.component.html',
  styleUrl: './card-skill.component.css'
})
export class CardSkillComponent {
  @Input() textTitle: string = 'Title';
  @Input() textDescription: string = 'Description';
}
