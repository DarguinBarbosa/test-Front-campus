import { FormComponent } from './form/form.component';
import { InfoComponent } from './info/info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"info",
    component:InfoComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"form",
    component:FormComponent
  },
  {
    path:"**",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
