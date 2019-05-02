import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
    component: AddHotelComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
