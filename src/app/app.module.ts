import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';

import {FlexLayoutModule} from '@angular/flex-layout';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ListHotelsComponent } from './list-hotels/list-hotels.component';
import { LoginComponent} from './login/login.component';
import { PizzaPartyComponent_sucsess, PizzaPartyComponent_failed, Logout_success, Signup_success, Signup_error, DialogContentExampleDialog, Delete_yourselfe, Hotel_added, Hotel_reserved, Hotel_delete } from './sb-container/sb-container.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';

import { AlertComponent } from './directives/index';
import { AlertService } from './services/index';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatExpansionModule,
  MatDialogModule,
  MatSlideToggle,
  MatSlideToggleModule,
  MatTree,
  MatTreeModule
} from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './signup.service';

import { MatFileUploadModule } from 'angular-material-fileupload';


import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';

import {MatCardModule} from '@angular/material/card';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateHotelComponent } from "./update-hotel/update-hotel.component";
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { SbContainerComponent } from './sb-container/sb-container.component';
import { OverlayModule } from '@angular/cdk/overlay';

// import { Upload } from 'material-ui-upload/Upload';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ListHotelsComponent,
    LoginComponent,
    AddHotelComponent,
    AlertComponent,
    UserProfileComponent,
    ListUsersComponent,
    UpdateHotelComponent,
    PizzaPartyComponent_sucsess,
    PizzaPartyComponent_failed,
    SbContainerComponent,
    Logout_success,
    Signup_success,
    Signup_error,
    DialogContentExampleDialog,
    Delete_yourselfe,
    Hotel_added,
    Hotel_reserved,
    Hotel_delete    
  ],
  entryComponents: [
    PizzaPartyComponent_sucsess,
    PizzaPartyComponent_failed,
    Logout_success,
    Signup_success,
    Signup_error,
    DialogContentExampleDialog,
    Delete_yourselfe,
    Hotel_added,
    Hotel_reserved,
    Hotel_delete
  ],
  imports: [
    SlimLoadingBarModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFileUploadModule,
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    OverlayModule,
    MatSlideToggleModule,
    MatTreeModule
    // Upload
  ],
  providers: [
    SignupService,
    AlertService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
