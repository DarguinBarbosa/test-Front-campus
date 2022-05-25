import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { InfoComponent } from './info/info.component';
import { MaterialModule } from 'src/app/material.module';
import { NgChartsModule } from 'ng2-charts';
import { DialogTable, TableComponent } from './table/table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Dialog, FormComponent, infoInput } from './form/form.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    InfoComponent,
    TableComponent,
    FormComponent,
    infoInput,
    Dialog,
    DialogTable,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MaterialModule,
    SharedModule,
    NgChartsModule
  ],providers:[TableComponent]
})
export class ContentModule { }
