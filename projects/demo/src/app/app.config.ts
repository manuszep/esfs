import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class TranslationLoaderService implements TranslateLoader {
  getTranslation(_lang: string): Observable<any> {
    console.log(_lang);
    return of({
      DEMO_TEXT_Q: 'Text question',
      DEMO_TEXT_TB: 'Text before',
      DEMO_TEXT_TA: 'Text after',
      DEMO_TEXT_PH: 'Text placeholder',
      DEMO_TEXT_HELP: 'Text help',
    });
  }
}

const httpLoaderFactory: (http: HttpClient) => TranslateLoader = () =>
  new TranslationLoaderService();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
      },
    }),
  ],
};
