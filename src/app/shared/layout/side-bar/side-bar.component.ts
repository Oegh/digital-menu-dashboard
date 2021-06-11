import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { sidebarAnimation, iconAnimation, labelAnimation } from '../animations';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

const UPC_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" class="bi bi-upc-scan" viewBox="0 0 16 16 d">
<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
</svg>
`;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [
    './side-bar.component.css'],
    animations: [
      sidebarAnimation(),
      iconAnimation(),
      labelAnimation(),
    ]
})
export class SideBarComponent implements OnInit {

  sidebarState: string;

  constructor(private sidebarService: SidebarService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('upc', sanitizer.bypassSecurityTrustHtml(UPC_ICON));
   }

  ngOnInit(): void {
    this.sidebarService.sidebarStateObservable$.
      subscribe((newState: string) => {
        this.sidebarState = newState;
      });
  }

}
