import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule , NgForm}   from '@angular/forms';
import { CommanService } from './services/comman.service';
import { ApiEndPointService } from './services/api-end-point.service';
import { HttpService } from './services/http.service';
import { ValidationService } from './services/validation.service';
import { AuthService } from './services/auth.service';
import { RequestCacheService } from './services/request-cache.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule		
  ],
  exports:[FormsModule,
    ReactiveFormsModule,
],

    providers: [
	  CommanService,
      ApiEndPointService,
      RequestCacheService,
      HttpService,
      AuthService,
      ValidationService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthService,
        multi: true,
	  }
    ]
  })
export class CoreModule { }
