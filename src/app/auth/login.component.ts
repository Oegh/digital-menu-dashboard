import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  emailInvalid: boolean = false;
  userPassIncorrect: boolean = false;
  submitInvalid: boolean = false;

  invalidUser: boolean = false;

  user: UserModel;

  submitForm = this._formBuilder.group({
    email: ['', Validators.required],
    pass: ['', Validators.required],
    rememberMe: ['']
  });

  constructor(private _formBuilder: FormBuilder, 
              private _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    //TODO show loading spinner
    this._authService.getCurrentUser().subscribe(data => {
      if(data) {
        //TODO show animation while loading user
        this._router.navigate(['/']);
      }
      else {
        this.user = new UserModel();
        if( localStorage.getItem('email') ) {
          this.user.email = localStorage.getItem('email');
          this.submitForm.get('email').setValue(localStorage.getItem('email'));
          this.submitForm.get('rememberMe').setValue(true);
        }
      }
    });
  }

  onGoogleSignIn(): void {
    this._authService.googleAuth().then(res => {
      this._authService.updateCurrentUser(res.user).then(() => {
        if(res.additionalUserInfo.isNewUser) {
          //TODO show onboarding registration
        }
        else {
          this._authService.updateCurrentUser(res.user).then(() => {
            this._router.navigate(['/home']);
          })
        }   
      });
    }).catch((err) => {
      if(err.code === 'auth/network-request-failed'){
        alert('Error de conexion');
      }
    });
  }

  onSubmit(): void {
    if(this.submitForm.valid && !this.emailInvalid) {
      this.submitInvalid = false;
      this.user.email = this.submitForm.get('email').value;
      this.user.pass = this.submitForm.get('pass').value;

      this._authService.emailAuth(this.user).then((res) => {
        console.log(res);
        if( this.submitForm.get('rememberMe').value) {
          localStorage.setItem('email', this.user.email);
        }
        this._authService.updateCurrentUser(res.user).then(() => {
          this._router.navigate(['/home']);
        })
      }).catch((err) => {
        if(err.code === 'auth/network-request-failed'){
          alert('Error de conexion');
        }
      })
    }
    else {
      this.submitInvalid = true;
    }
  }

  onChanges(event) {
    if(event.target.value && event.target.validity.valid){
      event.target.classList.add('is-valid');
      if( event.target.classList.contains('is-invalid'))
      {
        event.target.classList.remove('is-invalid')
      }
    }
    else{
      event.target.classList.add('is-invalid');
      if( event.target.classList.contains('is-valid'))
      {
        event.target.classList.remove('is-valid')
      }
    }
  }

   /**
   * Register Form inputs onChange()
   * @param event change detected on the form input
   */
    onChangeEmail(event){
      if(event.target.value && event.target.validity.valid){
        event.target.classList.add('is-valid');
        if( event.target.classList.contains('is-invalid'))
        {
          event.target.classList.remove('is-invalid')
        }
        this.emailInvalid = false;
      }
      else{
        event.target.classList.add('is-invalid');
        if( event.target.classList.contains('is-valid'))
        {
          event.target.classList.remove('is-valid')
        }
        this.emailInvalid = true;
      }
    }

}
