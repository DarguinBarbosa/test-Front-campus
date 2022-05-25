import { SessionGuard } from './../core/guard/session.guard';
import { SideComponent } from './side/side.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [

  {
    path:"",
    loadChildren:()=> import ('../content/content.module').then(r=>r.ContentModule),
    canActivate:[SessionGuard]
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
