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

//modelModule:
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { ViewListComponent } from './view-list/view-list.component';
import { LayoutsComponent } from './layouts/layouts.component';

//http for server;
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ViewListComponent,
    LayoutsComponent,   
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
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
