import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class LoginModule { }
