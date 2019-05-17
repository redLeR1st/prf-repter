import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateHotelComponent } from "./update-hotel/update-hotel.component";
import { RoleGuard } from './guards/role-guard.service';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'listhotels',
    component: ListHotelsComponent
  },
  {
    path: 'addhotel',
    component: AddHotelComponent,
    canActivate: [RoleGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listusers',
    component: ListUsersComponent,
    canActivate: [RoleGuard],
    data: {role: 'Admin'}
  },{
    path: 'listhotels/updatehotel',
    component: UpdateHotelComponent,
    canActivate: [RoleGuard],
    data: {role: 'Admin'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
