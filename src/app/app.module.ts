import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
//components
import { AppComponent } from './app.component';



const appRoutes: Routes = [
  {
		path: '',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	}, {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
  },{
    path: 'user',
    loadChildren: () => import('./main-modules/main-modules.module').then(module => module.MainModulesModule)
	}
    ]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RouterModule.forRoot(
      appRoutes 
      ),
      NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
