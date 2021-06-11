import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../core/services/sidebar.service';
import { mainContentAnimation } from '../shared/layout/animations';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  animations: [
    mainContentAnimation(),
  ]
})
export class PagesComponent implements OnInit {
  sidebarState: string;
  showFiller = false;


  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.sidebarStateObservable$
      .subscribe((newState: string) => {
        this.sidebarState = newState;
      });
  }

}
