import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { B2CSettings } from './app/core/auth/b2c.settings';


if (environment.production) {
	enableProdMode();
}

export function run(b2cSettings: B2CSettings) {
	platformBrowserDynamic([{ provide: 'b2cSettings', useValue: b2cSettings }])
		.bootstrapModule(AppModule);
}