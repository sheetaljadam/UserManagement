import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/auth/login',
		pathMatch: 'full'
	}, {
		path: '',
		component: AuthComponent,
		children: [{
			path: 'login',
			component: LoginComponent
		}, {
			path: 'reg',
			component: RegistrationComponent
		},
	]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	providers: [],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
