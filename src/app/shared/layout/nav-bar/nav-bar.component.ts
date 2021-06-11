import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {

  }

  signOut() {
    this._authService.signOut();
  }
}
