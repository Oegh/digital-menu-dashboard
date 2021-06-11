import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  loginRoute: boolean = false;

  constructor(public _router:Router){}

  ngOnInit(): void {
    if(this._router.url.includes('/login')) {
      this.loginRoute = true;
      console.log(this._router.url);
    }
    else {
      this.loginRoute = false;
      console.log(this._router.url);
    }
    console.log(this.loginRoute);
  }

  isLoginRoute(): boolean {
    if(this._router.url.includes('/login')) {
      return true;
    }
    return false;
  }


}
