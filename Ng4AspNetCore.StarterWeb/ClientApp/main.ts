import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AuthSettings } from './app/core/auth/auth.settings';


if (environment.production) {
	enableProdMode();
}

export function run(authSettings: AuthSettings) {
	platformBrowserDynamic([{ provide: 'authSettings', useValue: authSettings }])
		.bootstrapModule(AppModule);
}