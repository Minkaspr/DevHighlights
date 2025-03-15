import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private languageService = inject(LanguageService);

  public translations = this.languageService.translations;
}
