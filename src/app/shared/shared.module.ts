import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { ToogleSideBarComponent } from './layout/toogle-side-bar/toogle-side-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [BreadcrumbsComponent, FooterComponent, NavBarComponent, SideBarComponent, ToogleSideBarComponent],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsComponent,
    FooterComponent,
    NavBarComponent,
    SideBarComponent,
    CommonModule,
    MatSidenavModule,
    ToogleSideBarComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule
  ]
})
export class SharedModule { }
