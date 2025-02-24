import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';
import { SunIconComponent } from "../icons/sun-icon/sun-icon.component";
import { MoonIconComponent } from "../icons/moon-icon/moon-icon.component";
import { MenuIconComponent } from "../icons/menu-icon/menu-icon.component";
import { CloseIconComponent } from "../icons/close-icon/close-icon.component";
import { FolderDarkIconComponent } from "../icons/folder-dark-icon/folder-dark-icon.component";
import { FolderLightIconComponent } from "../icons/folder-light-icon/folder-light-icon.component";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-header',
  imports: [SunIconComponent, MoonIconComponent, MenuIconComponent, CloseIconComponent, FolderDarkIconComponent, FolderLightIconComponent, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() activeSection: string = 'hero';
  @Output() sectionSelected = new EventEmitter<string>();
  
  public darkTheme: boolean = false;
  public isLoading: boolean = true;
  public translations: any = {};
  public languageOptions: { value: string, label: string }[] = [];
  public selectedLanguage: string = '';
  public visibleMenu: boolean = false;


  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initTheme();
    this.initLanguage();
  }

  private initTheme(): void {
    this.themeService.isDarkTheme.subscribe(isDark => {
      this.darkTheme = isDark;
    });
  }

  private initLanguage(): void {
    this.languageService.translations.subscribe(translations => {
      this.translations = translations;
      this.languageOptions = [
        { value: 'es', label: translations?.nav?.language?.spanish },
        { value: 'en', label: translations?.nav?.language?.english }
      ];
      this.languageService.currentLanguage.subscribe(language => {
        this.selectedLanguage = language;
      });
    });
    this.languageService.loadingState.subscribe(loading => {
      this.isLoading = loading;
    });
  }

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
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('currentTheme', this.darkTheme ? 'dark' : 'light');
    this.themeService.setDarkTheme(this.darkTheme);
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
