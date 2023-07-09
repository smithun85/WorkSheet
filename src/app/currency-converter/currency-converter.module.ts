import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyConverterRoutingModule } from './currency-converter-routes';
import { CurrencyConverterComponent } from './currency-converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CurrencyConverterComponent
  ],
  imports: [
    CommonModule,
    CurrencyConverterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CurrencyConverterModule { }
