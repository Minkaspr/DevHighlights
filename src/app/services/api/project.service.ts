import { inject, Injectable, Signal } from '@angular/core';
import { ApiResponse } from '../../models/api-response';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);
  private URL_BASE: string = `${environment.API_DOMAIN}${environment.API_PREFIX}`;
 
  async getAllProjectsRs(language: string) {
    const response = await fetch(`${this.URL_BASE}/projects/lang/${language}`);
    const data = await response.json();
    return data;
  }

  getAllProjectsRx(language: string): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.URL_BASE}/projects/lang/${language}`);
  }
  
  getAllProjectsHttpRs(language: Signal<string>) {
    return httpResource<ApiResponse>(() => ({
      url: `${this.URL_BASE}/projects/lang/${language()}`,
      method: 'GET',
    }));
  }
}
