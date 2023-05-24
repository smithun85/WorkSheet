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
import { ViewListComponent } from './view-list/view-list.component';
import { OperationsModule } from './operations/operations.module';
import { LayoutsComponent } from './layouts/layouts.component';



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
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
