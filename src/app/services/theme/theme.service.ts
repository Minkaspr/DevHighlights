import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkTheme: BehaviorSubject<boolean>;
  private lightThemeIcon: string = 'favicons/folder-outline.svg';
  private darkThemeIcon: string = 'favicons/folder-filled.svg';

  constructor() {
    this.darkTheme = new BehaviorSubject<boolean>(false);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('currentTheme');

    if (savedTheme) {
      this.setDarkTheme(savedTheme === 'dark');
    } else {
      this.setDarkTheme(isBrowserDarkMode);
      const theme = isBrowserDarkMode ? 'dark' : 'light';
      localStorage.setItem('currentTheme', theme);
    }
    this.updateFavicon();
  }

  public get isDarkTheme() {
    return this.darkTheme.asObservable();
  }

  // Método para establecer el tema oscuro y emitir el valor
  public setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Método para cambiar el favicon según el tema del navegador
  private updateFavicon(): void {
    const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const icon = isBrowserDarkMode ?  this.lightThemeIcon : this.darkThemeIcon;
    this.setFavicon(icon);
  }

  // Función para cambiar el favicon
  private setFavicon(icon: string): void {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}
