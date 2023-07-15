import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// FormsModule
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


//http for server;
import { HttpClientModule } from '@angular/common/http';

//dropdown
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//modelModule:
import { ModalModule } from 'ngx-bootstrap/modal';
//pagination
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';





@NgModule({
  declarations: [
    AppComponent,
    DeletePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,   
    ModalModule.forRoot(),
    HttpClientModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FontAwesomeModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
