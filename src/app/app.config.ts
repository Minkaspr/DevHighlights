import { ApplicationConfig, provideZoneChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { LanguageService } from './services/languague/language.service';
import { ThemeService } from './services/theme/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(()=>{ inject(ThemeService) }),
    provideAppInitializer(()=>{ inject(LanguageService) }),
    provideAnimations()
  ]
};
