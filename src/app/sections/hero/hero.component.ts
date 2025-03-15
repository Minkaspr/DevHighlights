import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';
import { PersonHeroIconComponent } from "../../icons/person-hero-icon/person-hero-icon.component";
import { BadgeComponent } from "../../components/badge/badge.component";
import { SocialPillComponent } from "../../components/social-pill/social-pill.component";
import { MailIconComponent } from "../../icons/mail-icon/mail-icon.component";
import { LinkedinIconComponent } from "../../icons/linkedin-icon/linkedin-icon.component";

@Component({
  selector: 'app-hero',
  imports: [PersonHeroIconComponent, BadgeComponent, SocialPillComponent, MailIconComponent, LinkedinIconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  public darkTheme = this.themeService.isDarkTheme;
  public translations = this.languageService.translations;
}
