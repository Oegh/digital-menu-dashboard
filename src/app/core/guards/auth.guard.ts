import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth'; // instead of firebase
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor( private _authService: AuthService,
    private _router: Router,
    private auth: AngularFireAuth) {

  }

  canLoad(): Observable<boolean> {
    return this.performCheck();
  }

  canActivate(): Observable<boolean> {
    return this.performCheck();;
  }

  private performCheck(): Observable<boolean> {
    return this._authService.getCurrentUser().pipe(map((user) => {
      if(user) {
        return true;
      }
      this._router.navigateByUrl('/login');
      return false;
    }))
  }

  // async canLoad(): Promise<boolean> {
  //   return this._authService.getCurrentUser().then(data => {
  //     return true;
  //   }).finally(()=> {
  //     return false;
  //   })
    
  //   // if( this._authService.isAuthenticated() ) {
  //   //   return true;
  //   // }
  //   // else {
  //   //   this._router.navigateByUrl('/login');
  //   //   return false;
  //   // }
  // }

  
  
}
