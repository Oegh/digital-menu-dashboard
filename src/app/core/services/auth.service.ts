import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _http: HttpClient,
              private router: Router,
              private _afAuth: AngularFireAuth) { }

  googleAuth(): Promise<firebase.auth.UserCredential> {
    return this._afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } 

  emailAuth(user: UserModel): Promise<firebase.auth.UserCredential> {
    return this._afAuth.signInWithEmailAndPassword(user.email, user.pass);
  }

  registerUser(user: UserModel): Promise<firebase.auth.UserCredential> {
    return this._afAuth.createUserWithEmailAndPassword(user.email, user.pass);
  }

  updateCurrentUser(logedInUser: firebase.User): Promise<void> {
    return this._afAuth.updateCurrentUser(logedInUser);
  }

  getCurrentUser(): Observable<firebase.User> {
    return this._afAuth.user;
  }

  signOut() {
    this._afAuth.signOut();
    this.router.navigate(['/login']);
  }
}

/*
@Injectable({
  providedIn: 'root'
})
export class OldLogin{

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBcicu5PvHWc1-ycX4U_iCQfjaZ3ZVIWD0';

  userToken: string;

  //Register user
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private _http: HttpClient,
    private router: Router) {
      this.readToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.pass,
      returnSecureToken: true
   };

   return this._http.post(
    `${ this.url }signInWithPassword?key=${ this.apiKey }`,
    authData
  ).pipe(
    map( resp => {
      this.saveToken( resp['idToken'] );
      return resp;
    })
  );
  }

  registerUser(user: UserModel) {
    const authData = {
       email: user.email,
       password: user.pass,
       returnSecureToken: true
    };

    return this._http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );

  }

  private saveToken( idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  readToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }
    else {
      this.userToken = '';
    }

    return this.userToken;
  }

  isAuthenticated(): boolean {
    if(this.userToken === undefined) {
      return false;
    }
    return this.userToken.length > 2;
  }

}*/
