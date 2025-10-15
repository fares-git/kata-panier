import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {App} from './app/app';
import '@angular/common/locales/global/fr';
import {worker} from './mocks/browser';

worker.start().then(() => {

  bootstrapApplication(App, appConfig)
    .catch((err) => console.error(err));

});
