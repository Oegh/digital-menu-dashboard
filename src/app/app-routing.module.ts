import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanLoad } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login',  loadChildren: () => import('./auth/login.module').then(m => m.LoginModule) },
  { path: '', /*canLoad: [ AuthGuard ],*/ loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: '**', canActivate: [ AuthGuard ], redirectTo: ''},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }