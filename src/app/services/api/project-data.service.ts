import { computed, effect, inject, Injectable, resource, ResourceStatus, Signal, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiResponse } from '../../models/api-response';
import { ProjectService } from './project.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private projectService = inject(ProjectService);
  private apiCacheDuration = environment.API_CACHE_EXPIRATION_HOURS * 60 * 60 * 1000;
  private projectsCache: WritableSignal<ApiResponse | null> = signal(null);
  public loading: WritableSignal<boolean> = signal(false);
  private ERROR_MESSAGES: Record<string, string> = {
    en: 'Failed to load projects. Please try again later.',
    es: 'No se pudieron cargar los proyectos. Inténtalo más tarde.',
  };

  getAllProjects(language: Signal<string>) : Signal<ApiResponse | null>{
    const projects = this.projectService.getAllProjectsHttpRs(language);

    effect(() => {
      const lang = language();
      const cacheKey = `projects_${lang}`;
      const cacheTimestampKey = `${cacheKey}_timestamp`;

      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(cacheTimestampKey);

      if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < this.apiCacheDuration) {
        this.projectsCache.set(JSON.parse(cachedData));
      } else {
        const response = projects.value();
        this.loading.set(projects.isLoading());
        
        if (response && response.status === 'success') {
          this.projectsCache.set(response);
          localStorage.setItem(cacheKey, JSON.stringify(response));
          localStorage.setItem(cacheTimestampKey, Date.now().toString());
        } else {
          this.projectsCache.set(
            cachedData ? JSON.parse(cachedData) : {
              status: 'error',
              message: this.ERROR_MESSAGES[lang] || this.ERROR_MESSAGES['en'],
              data: []
            }
          );
        }
      }
    });
    return this.projectsCache;
  }

  getAllProjectsRs(language: Signal<string>) {
    const allProjectsRs = resource({
      request: language,
      loader: ({ request }) => this.projectService.getAllProjectsRs(request)
    })
    console.log("getAllProjectsRs of ProjectDataService: ", allProjectsRs.value());

    return computed(() => {
      const response = allProjectsRs.value();
      if (!response || response.status !== 'success') {
        return [];
      }
      return response.data;
    });
  }

  getAllProjectsRx(language: Signal<string>) {
    const allProjectsRx = rxResource({
      request: language,
      loader: (param) => this.projectService.getAllProjectsRx(param.request)
    })
    console.log("getAllProjectsRx of ProjectDataService: ", allProjectsRx.value());
    return computed(() => {
      const response = allProjectsRx.value();
      if (!response || response.status !== 'success') {
        return [];
      }
      return response.data;
    });
  }
  
  getAllProjectsHttpRs(language: Signal<string>){
    const allProjectsHttpRs = this.projectService.getAllProjectsHttpRs(language);
    console.log("getAllProjectsHttpRs of ProjectDataService: ", allProjectsHttpRs.value());
    return computed(() => {
      const response = allProjectsHttpRs.value()
      if (!response || response.status !== 'success') {
        return [];
      }
      return response.data;
    });
  }
}
