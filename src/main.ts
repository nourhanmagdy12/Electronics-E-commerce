import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appProviders } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    ...appProviders,
    provideRouter(routes),
    provideHttpClient()
  ]
});
