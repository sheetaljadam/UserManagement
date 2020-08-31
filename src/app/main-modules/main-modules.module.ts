import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

import { MainModulesRoutingModule } from './main-modules-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainModulesComponent } from './main-modules.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const appRoutes: Routes = [

  {
      path: '',
      component: MainModulesComponent,
      children: [
          { path: '', component: UserProfileComponent },
          { path: 'user', component: UserProfileComponent },
          {
            path: 'usr/:id',
            component: EditUserComponent,
            pathMatch: 'full'
          }
          
        ]
  }];
@NgModule({
  declarations: [
    MainModulesComponent,
    UserProfileComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    MainModulesRoutingModule,
    RouterModule.forChild(
      appRoutes 
      ),
      CoreModule
  ],
  entryComponents:[
  ]
})
export class MainModulesModule { 
  EditUserComponent
}
