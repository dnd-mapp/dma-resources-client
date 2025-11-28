import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, Root } from './app';

bootstrapApplication(Root, appConfig).catch((error) => console.error(error));
