import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  emailInvalid: boolean = false;
  passwordWeak: boolean = false;
  emailExists: boolean = false;

  submitForm = this._formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    pass: ['', Validators.required],
    confirmPass: new FormControl('', (control: FormControl) => {
      const value = control.value;

      if (!value) {
        return null;
      }

      if (!this.submitForm.get('pass').value) {
        document.getElementById('re_pass').classList.add('is-invalid');
        return {passFirst: true};
      }
      else {
        document.getElementById('re_pass').classList.remove('is-invalid');
      }

      if(this.submitForm.get('pass').value !== value) {
        document.getElementById('re_pass').classList.remove('is-valid');
        document.getElementById('re_pass').classList.add('is-invalid');
        return {passDontMatch: true};
      }
      else {
        document.getElementById('re_pass').classList.remove('is-invalid');
        document.getElementById('re_pass').classList.add('is-valid');
      }
    }),
    agree: ['', Validators.required],
  });

  constructor(private _formBuilder:FormBuilder,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.user = new UserModel();

  }

  onSubmit(): void {
    if(this.submitForm.valid && !this.emailInvalid 
      && !this.passwordWeak && this.submitForm.get('agree').value) {
        this.user.email = this.submitForm.get('email').value;
        this.user.name = this.submitForm.get('userName').value;
        this.user.pass = this.submitForm.get('pass').value;

        this._authService.registerUser(this.user).then(data => {
          //TODO make onboarding with restaurant and more user data registration
        }).catch((err) => {
          //TODO show error
        });

        // this._authService.registerUser( this.user ).subscribe(data => {
        //    console.log(data);
        // }, (err) => {
        //   if(err.error.error.message === 'EMAIL_EXISTS') {
        //     this.emailExists = true;
        //   }
        // })
    }
  }

  /**
   * Contact Form inputs onChange()
   * @param event change detected on the form input
   */
   onChange(event){
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

 /**
   * regiser Form inputs onChangePassword()
   * check if the password its correct
   * @param event change detected on the form input
   */
  onChangePassword(event) {
    if(event.target.value && event.target.validity.valid){
      if(this.isPasswordStrong(event.target.value)) {
        console.log(this.isPasswordStrong(event.target.value));
        event.target.classList.add('is-valid');
        if( event.target.classList.contains('is-invalid'))
        {
          event.target.classList.remove('is-invalid')
        }
        this.passwordWeak = false;
      }
      else {
        event.target.classList.add('is-invalid');
        if( event.target.classList.contains('is-valid'))
        {
          event.target.classList.remove('is-valid')
        }
        this.passwordWeak = true;
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

  private isPasswordStrong(pass: string): boolean {
    console.log(this.checkStrength(pass));
    if(this.checkStrength(pass) === 10 || 
        this.checkStrength(pass) === 20 ){
      return false;
    }
    else {
      return true;
    }
  }

  private checkStrength(p): number {
    // 1
    let force = 0;
  
    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);
  
    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];
  
    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
  
    // 5
    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;
  
    // 6
    force = (p.length <= 6) ? Math.min(force, 10) : force;
  
    // 7
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;
  
    return force;
  }
}


