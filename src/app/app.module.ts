import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// FormsModule
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Modules
import { ShareModule } from './share/share.module';
import { OperationsModule } from './operations/operations.module';
import { ActionFormsModule } from './action-forms/action-forms.module';

//modelModule:
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { ViewListComponent } from './view-list/view-list.component';
import { LayoutsComponent } from './layouts/layouts.component';

//http for server;
import { HttpClientModule } from '@angular/common/http';
import { AddInputFieldsComponent } from './add-input-fields/add-input-fields.component';

//dropdown
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSelectModule } from 'ngx-select-ex';




@NgModule({
  declarations: [
    AppComponent,
    ViewListComponent,
    LayoutsComponent,
    AddInputFieldsComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    OperationsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ActionFormsModule,
    NgxSelectModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
