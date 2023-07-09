import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component';

const routes: Routes = [
  {
    path:'',
    component:CurrencyConverterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyConverterRoutingModule { }
