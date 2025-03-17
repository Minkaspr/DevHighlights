import { AfterViewChecked, AfterViewInit, Component, computed, ElementRef, EventEmitter, inject, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { LanguageService } from '../../services/languague/language.service';
import { ThemeService } from '../../services/theme/theme.service';
import { SunIconComponent } from "../../icons/sun-icon/sun-icon.component";
import { MoonIconComponent } from "../../icons/moon-icon/moon-icon.component";
import { MenuIconComponent } from "../../icons/menu-icon/menu-icon.component";
import { CloseIconComponent } from "../../icons/close-icon/close-icon.component";
import { FolderDarkIconComponent } from "../../icons/folder-dark-icon/folder-dark-icon.component";
import { FolderLightIconComponent } from "../../icons/folder-light-icon/folder-light-icon.component";
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
export class HeaderComponent implements AfterViewChecked, OnChanges{

  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);

  @Input() activeSection: string = 'hero';
  @Output() sectionSelected = new EventEmitter<string>();

  @ViewChildren('navLink', { read: ElementRef }) navLinks!: QueryList<ElementRef>;
  
  public darkTheme = this.themeService.isDarkTheme;
  public visibleMenu: boolean = false;
  public isLoading = this.languageService.loadingState;
  public translations = this.languageService.translations;
  public selectedLanguage = this.languageService.currentLanguage;

  public languageOptions = computed(() => [
    { value: 'es', label: this.translations()?.nav?.language?.spanish || 'Español' },
    { value: 'en', label: this.translations()?.nav?.language?.english || 'English' }
  ]);

  private links: HTMLElement[] = [];
  private sections = ['hero', 'projects', 'about'];

  ngAfterViewChecked(): void {
    if (this.navLinks && this.navLinks.length > 0 && this.links.length === 0) {
      this.links = this.navLinks.toArray().map(el => el.nativeElement);
      
      this.links.forEach((link, index) => {
        link.addEventListener('mouseenter', () => this.handleHover(index));
      });

      //console.log('Enlaces detectados:', this.links);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeSection']) {
      this.updateHoverClasses();
    }
  }

  private handleHover(hoverIndex: number): void {
    const activeIndex = this.links.findIndex(link => link.classList.contains('active'));
    
    if (activeIndex === -1 || hoverIndex === activeIndex) {
      return; // No hay elemento activo o el hover es sobre el mismo
    }

    const movingRight = hoverIndex > activeIndex;
    //console.log(`Moviendo hacia la ${movingRight ? 'derecha' : 'izquierda'}`);

    // Actualizamos la clase del enlace que era activo
    this.links[activeIndex].classList.remove('hover-left', 'hover-right');
    void this.links[activeIndex].offsetWidth; // Forzar reflow para reiniciar la animación
    this.links[activeIndex].classList.add(movingRight ? 'hover-left' : 'hover-right');

    // Aplicamos el hover al nuevo elemento
    this.links[hoverIndex].classList.remove('hover-left', 'hover-right');
    void this.links[hoverIndex].offsetWidth;
    this.links[hoverIndex].classList.add(movingRight ? 'hover-right' : 'hover-left');
  }
  
  public onSectionSelect(sectionId: string): void {
    this.sectionSelected.emit(sectionId);
    this.activeSection = sectionId;
    if (this.visibleMenu) {
      this.toggleMenu();
    }
  }

  onKeydown(event: KeyboardEvent, section: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onSectionSelect(section);
    }
  }

  public updateActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  private updateHoverClasses(): void {
    const activeIndex = this.sections.indexOf(this.activeSection); // Encontrar índice del activo
    if (activeIndex === -1) return; // Si no hay un activo válido, salir
    this.handleHover(activeIndex);
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public onLanguageSelected(language: string): void {
    this.languageService.changeLanguage(language);
  }

  public toggleMenu(): void {
    this.visibleMenu = !this.visibleMenu;
    document.body.classList.toggle('overflow-hidden', this.visibleMenu);
  }
}
