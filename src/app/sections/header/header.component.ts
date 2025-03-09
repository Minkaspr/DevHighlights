import { Component, computed, EventEmitter, inject, Input, Output, Renderer2 } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';
import { SunIconComponent } from "../../components/icons/sun-icon/sun-icon.component";
import { MoonIconComponent } from "../../components/icons/moon-icon/moon-icon.component";
import { MenuIconComponent } from "../../components/icons/menu-icon/menu-icon.component";
import { CloseIconComponent } from "../../components/icons/close-icon/close-icon.component";
import { FolderDarkIconComponent } from "../../components/icons/folder-dark-icon/folder-dark-icon.component";
import { FolderLightIconComponent } from "../../components/icons/folder-light-icon/folder-light-icon.component";
import { DropdownComponent } from "../../components/dropdown/dropdown.component";

@Component({
  selector: 'app-header',
  imports: [
    SunIconComponent, 
    MoonIconComponent, 
    MenuIconComponent, 
    CloseIconComponent, 
    FolderDarkIconComponent, 
    FolderLightIconComponent, 
    DropdownComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);

  @Input() activeSection: string = 'hero';
  @Output() sectionSelected = new EventEmitter<string>();
  
  public darkTheme = this.themeService.isDarkTheme;
  public visibleMenu: boolean = false;
  
  public isLoading = this.languageService.loadingState;
  public translations = this.languageService.translations;
  public selectedLanguage = this.languageService.currentLanguage;

  public languageOptions = computed(() => [
    { value: 'es', label: this.translations()?.nav?.language?.spanish || 'Español' },
    { value: 'en', label: this.translations()?.nav?.language?.english || 'English' }
  ]);

  public onSectionSelect(sectionId: string): void {
    this.sectionSelected.emit(sectionId);
    this.activeSection = sectionId;
    if (this.visibleMenu) {
      this.toggleMenu();
    }
  }

  public updateActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public onLanguageSelected(language: string): void {
    this.languageService.changeLanguage(language);
  }

  public toggleMenu(): void {
    this.visibleMenu = !this.visibleMenu;
    if (this.visibleMenu) {
      this.renderer.addClass(document.body, 'no-scroll');
      console.log('Scroll deshabilitado');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
      console.log('Scroll habilitado');
    }
  }
}
