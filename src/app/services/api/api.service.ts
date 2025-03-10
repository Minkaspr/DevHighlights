import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response';
import { LanguageService } from '../languague/language.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private languageService = inject(LanguageService);
  private apiUrl = environment.API_URL;
  private apiCacheDuration = environment.API_CACHE_EXPIRATION_HOURS * 60 * 60 * 1000;

  public projectsResponse: WritableSignal<ApiResponse | null> = signal(null);
  public loading: WritableSignal<boolean> = signal(false);

  private ERROR_MESSAGES: Record<string, string> = {
    en: 'Failed to load projects. Please try again later.',
    es: 'No se pudieron cargar los proyectos. Inténtalo más tarde.',
  };

  constructor() {
    effect(() => {
      this.fetchProjects();
    });
  }

  public fetchProjects(): void {
    this.loading.set(true);

    const language = this.languageService.currentLanguage();
    const cacheKey = `projects_${language}`;
    const cacheTimestampKey = `${cacheKey}_timestamp`;

    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheTimestampKey);

    if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < this.apiCacheDuration) {
      this.projectsResponse.set(JSON.parse(cachedData));
      this.loading.set(false);
      return;
    }

    const url = `${this.apiUrl}/projects/lang/${language}`;
    
    this.http.get<ApiResponse>(url).pipe(
      catchError(error => {
        console.error('Error en la petición:', error);

        if (cachedData) {
          this.projectsResponse.set(JSON.parse(cachedData));
          return of(JSON.parse(cachedData));
        }
        this.projectsResponse.set({
          status: 'error',
          message: this.ERROR_MESSAGES[language] || this.ERROR_MESSAGES['en'],
          data: []
        });
        return of(null);
      })
    ).subscribe(data => {
      this.projectsResponse.set(data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimestampKey, Date.now().toString());
      this.loading.set(false);
    });
  }
}
