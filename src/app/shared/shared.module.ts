import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material.module';
import { SideComponent } from './side/side.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SpinerComponent } from './spiner/spiner.component';
import { MatSidenav } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    SideComponent,
    BreadcrumbsComponent,
    SpinerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    HttpClientModule,    
    NgbAccordionModule,
    NgbModule
  ],exports:[
    SideComponent,
    SpinerComponent
  ],providers:[
    MatSidenav
  ]
})
export class SharedModule { }
