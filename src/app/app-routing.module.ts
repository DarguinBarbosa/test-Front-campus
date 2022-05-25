import { SessionGuard } from './core/guard/session.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideComponent } from './shared/side/side.component';

const routes: Routes = [
  {
    path:"Auth",
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  
  {
    path:"",
    canActivate:[SessionGuard],
    component:SideComponent,
    loadChildren:()=>import('./shared/shared.module').then(m=>m.SharedModule),
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
