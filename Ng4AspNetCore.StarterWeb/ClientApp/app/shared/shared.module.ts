import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [HeaderComponent, FooterComponent],
	declarations: [HeaderComponent, FooterComponent]
})
export class SharedModule { }
