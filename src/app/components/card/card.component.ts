import { Component, inject, Input } from '@angular/core';
import { Project } from '../../models/project';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() project!: Project;

  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  public darkTheme = this.themeService.isDarkTheme;
  public translations = this.languageService.translations;
}
