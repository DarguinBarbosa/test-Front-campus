import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSelectModule} from '@angular/material/select/';
import { MatInputModule } from '@angular/material/input';
import{MatFormFieldModule} from '@angular/material/form-field'
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import{MatCardModule } from '@angular/material/card'
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],exports:[
    MatSliderModule,
    MatGridListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatBottomSheetModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatTreeModule,
    MatStepperModule,
    
    
  ]
})
export class MaterialModule { }
