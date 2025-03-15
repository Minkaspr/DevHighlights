import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private lightThemeIcon: string = 'favicons/folder-outline.svg';
  private darkThemeIcon: string = 'favicons/folder-filled.svg';
  
  public isDarkTheme: WritableSignal<boolean> = signal(false);
  public loadingState: WritableSignal<boolean> = signal(true);

  constructor() {
    this.initializeTheme();
    this.listenForSystemThemeChanges();
  }

  private initializeTheme(): void {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('currentTheme');

    const isDark = savedTheme ? savedTheme === 'dark' : isBrowserDarkMode;
    this.isDarkTheme.set(isDark);
    this.applyTheme();
    this.loadingState.set(false);
  }

  public toggleTheme(): void {
    this.isDarkTheme.set(!this.isDarkTheme());
    localStorage.setItem('currentTheme', this.isDarkTheme() ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.classList.toggle('dark', this.isDarkTheme());
    //this.updateFavicon();
  }

  private updateFavicon(): void {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const icon = isBrowserDarkMode ?  this.lightThemeIcon : this.darkThemeIcon;
    this.setFavicon(icon);
  }

  private setFavicon(icon: string): void {
    let link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.head.appendChild(link);
  }

  private listenForSystemThemeChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', () => {
      this.updateFavicon();
    });
  }
}
