import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: '', 
    component: PagesComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
      { path: '**', redirectTo: 'dashboard'}
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
