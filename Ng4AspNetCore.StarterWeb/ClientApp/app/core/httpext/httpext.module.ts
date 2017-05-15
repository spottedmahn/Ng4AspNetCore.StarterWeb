import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DefaultRequestOptionsService, RequestOptionsProvider } from './default-request-options.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DefaultRequestOptionsService, RequestOptionsProvider]
})

export class HttpExtModule { }
