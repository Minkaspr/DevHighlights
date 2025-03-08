import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly defaultLanguage: string = 'en';
  private readonly translationsPath: string = 'languages/';
  private readonly cacheDuration = environment.CACHE_EXPIRATION_HOURS * 60 * 60 * 1000;
  private _currentLanguage: BehaviorSubject<string>;
  private _translations: BehaviorSubject<any>;
  private _loadingState: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this._currentLanguage = new BehaviorSubject<string>(this.defaultLanguage);
    this._translations = new BehaviorSubject<any>({});
    this._loadingState = new BehaviorSubject<boolean>(true); 
    this.initializeLanguage();
    this._translations.subscribe(translations => {
      this.updateHtmlTitle(translations);
    });
  }

  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('language') || this.getDeviceLanguage();
    const initialLanguage = this.getInitialLanguage(savedLanguage);
    this.setLanguage(initialLanguage);
    localStorage.setItem('language', initialLanguage);
  }

  private getDeviceLanguage(): string {
    const deviceLanguage = navigator.language || navigator.languages[0];
    return deviceLanguage.startsWith('es') ? 'es' : 'en';
  }

  private getInitialLanguage(savedLanguage: string): string {
    return ['es', 'en'].includes(savedLanguage) ? savedLanguage : this.defaultLanguage;
  }

  private setLanguage(language: string): void {
    this._currentLanguage.next(language);
    this.loadTranslations(language);
    this.updateHtmlLang(language);
  }

  private loadTranslations(language: string): void {
    this._loadingState.next(true); 
    this.http.get(`${this.translationsPath}${language}.json`).subscribe({
      next: (translations: any) => {
        this._translations.next(translations);
        this._loadingState.next(false); 
      },
      error: () => {
        this._translations.next({});
        this._loadingState.next(false);
      }
    });
  }

  private updateHtmlLang(language: string): void {
    document.documentElement.lang = language; 
  }

  private updateHtmlTitle(translations: any): void {
    const title = translations.title || 'Minka...';
    document.title = title;
  }

  public get translations() {
    return this._translations.asObservable();
  }

  public get currentLanguage() {
    return this._currentLanguage.asObservable();
  }

  public get loadingState() {
    return this._loadingState.asObservable();
  }

  public changeLanguage(language: string): void {
    if (['es', 'en'].includes(language)) {
      localStorage.setItem('language', language);
      this.setLanguage(language);
    }
  }
}
