import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [RegistrationComponent, LoginComponent,AuthComponent],
  imports: [
    CommonModule,
    CoreModule,
    AuthRoutingModule
    
  ],entryComponents:[
    RegistrationComponent
  ]
})
export class AuthModule { }
