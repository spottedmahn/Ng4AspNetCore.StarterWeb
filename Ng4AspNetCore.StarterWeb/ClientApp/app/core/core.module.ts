import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthModule } from './auth/auth.module';
import { HttpExtModule } from './httpext/httpext.module';

@NgModule({
	imports: [
		CommonModule,
		AuthModule,
		HttpExtModule
	],
	declarations: []
})

export class CoreModule { }