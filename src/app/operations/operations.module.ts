import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWorksComponent } from './add-works/add-works.component';
import { EditWorksComponent } from './edit-works/edit-works.component';
import { ShareModule } from '../share/share.module';




@NgModule({
  declarations: [
    AddWorksComponent,
    EditWorksComponent,
    
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class OperationsModule { }
