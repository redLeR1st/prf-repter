import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
