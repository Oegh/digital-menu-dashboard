import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-toogle-side-bar',
  templateUrl: './toogle-side-bar.component.html',
  styleUrls: ['./toogle-side-bar.component.css']
})
export class ToogleSideBarComponent implements OnInit {

  constructor( private sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.sidebarService.toggle();
  }

}
