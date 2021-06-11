import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';



@NgModule({
  declarations: [BreadcrumbsComponent, FooterComponent, NavBarComponent, SideBarComponent],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsComponent,
    FooterComponent,
    NavBarComponent,
    SideBarComponent,
    CommonModule
  ]
})
export class SharedModule { }
