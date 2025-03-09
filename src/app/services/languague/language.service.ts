import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Translations } from '../../models/translations';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly defaultLanguage: string = 'en';
  private readonly translationsPath: string = 'languages/';
  private readonly cacheDuration = environment.CACHE_EXPIRATION_HOURS * 60 * 60 * 1000;

  public currentLanguage: WritableSignal<string> = signal(this.getInitialLanguage());
  public translations: WritableSignal<Translations> = signal({} as Translations);
  public loadingState: WritableSignal<boolean> = signal(true);

  constructor(){
    this.loadTranslations(this.currentLanguage());

    effect(() => {
      this.updateHtmlTitle(this.translations());
    });
  }

  private getInitialLanguage(): string {
    const savedLanguage = localStorage.getItem('language') || this.getDeviceLanguage();
    return ['es', 'en'].includes(savedLanguage) ? savedLanguage : this.defaultLanguage;
  }

  private getDeviceLanguage(): string {
    return navigator.language.startsWith('es') ? 'es' : 'en';
  }

  private async loadTranslations(language: string): Promise<void> {
    const cacheKey = `translations_${language}`;
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    // Si hay caché válido, usarlo
    if (cacheTimestamp && (Date.now() - Number(cacheTimestamp)) < this.cacheDuration) {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        this.translations.set(JSON.parse(cachedData));
        this.loadingState.set(false);
        return;
      }
    }

    // Descargar solo si no hay caché o ha expirado
    this.loadingState.set(true);
    try {
      const response = await fetch(`${this.translationsPath}${language}.json`);
      const data = await response.json();

      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

      this.translations.set(data);
    } catch (error) {
      console.error(`Error cargando ${language}.json:`, error);
      this.translations.set({} as Translations);
    } finally {
      this.loadingState.set(false);
    }
  }

  public changeLanguage(language: string): void {
    if (['es', 'en'].includes(language)) {
      localStorage.setItem('language', language);
      this.currentLanguage.set(language);
      this.loadTranslations(language);
    }
  }

  updateHtmlTitle(translations: Translations): void {
    const title = translations?.title || 'Minka...';
    document.title = title;
  }
}
