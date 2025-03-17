import { Component, HostListener, inject, OnInit } from '@angular/core';
import { LoadingPlaceholderComponent } from "./components/loading-placeholder/loading-placeholder.component";
import { HeaderComponent } from "./sections/header/header.component";
import { HeroComponent } from "./sections/hero/hero.component";
import { ProjectsComponent } from "./sections/projects/projects.component";
import { LanguageService } from './services/languague/language.service';
import { ThemeService } from './services/theme/theme.service';
import { AboutComponent } from "./sections/about/about.component";
import { FooterComponent } from "./sections/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [LoadingPlaceholderComponent, HeaderComponent, HeroComponent, ProjectsComponent, AboutComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  activeSection: string = 'hero';
  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);
  public isLoadingLang = this.languageService.loadingState;
  public isLoadingTheme = this.themeService.loadingState;

  ngOnInit(): void {
    this.updateHash(this.activeSection);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const sections = document.querySelectorAll('section');
    let currentSectionId = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 128 && rect.bottom > 128) {
        currentSectionId = section.id;
      }
    });

    if (currentSectionId && currentSectionId !== this.activeSection) {
      this.activeSection = currentSectionId;
      this.updateHash(currentSectionId);
      //this.notifyHeader(currentSectionId);
    }
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    const headerOffset = 68 + 12;
    const elementPosition = section?.getBoundingClientRect().top ?? 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    if (section) {
      this.updateHash(sectionId);
    }
  }

  notifyHeader(sectionId: string): void {
    console.log(`Active section: ${sectionId}`);
  }

  updateHash(sectionId: string): void {
    if (sectionId === 'hero') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${sectionId}`);
    }
  }
}
