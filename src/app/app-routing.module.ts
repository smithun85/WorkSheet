import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './share/form/form.component';
import { AddWorksComponent } from './operations/add-works/add-works.component';
import { EditWorksComponent } from './operations/edit-works/edit-works.component';
import { ViewListComponent } from './view-list/view-list.component';
import { AddInputFieldsComponent } from './add-input-fields/add-input-fields.component';
import { SendEmailComponent } from './action-forms/send-email/send-email.component';
import { SendMessageComponent } from './action-forms/send-message/send-message.component';
import { CallApiComponent } from './action-forms/call-api/call-api.component';
import { CallWorkflowComponent } from './action-forms/call-workflow/call-workflow.component';
import { CustomLogicComponent } from './action-forms/custom-logic/custom-logic.component';

const routes: Routes = [
  { path: '', redirectTo:'view', pathMatch: 'full' },

  {path:'view',
    component: ViewListComponent
  },

  {
    path:"inputfields",
    component:AddInputFieldsComponent
  },

  {
    path:'email',
    component:SendEmailComponent
  },

  {
    path:'message',
    component:SendMessageComponent
  },

  {
    path:'api',
    component:CallApiComponent
  },

  {
    path:'workflow',
    component:CallWorkflowComponent
  },

  {
    path:'logic',
    component:CustomLogicComponent
  },

  { path: 'form',
   component: FormComponent
  },
 
  {
    path:'add',
    component: AddWorksComponent
  },

  {
    path:'edit',
    component:EditWorksComponent
  },

  {
    path:'currencyconverter',
    loadChildren:()=>import('./currency-converter/currency-converter.module').then(m=>m.CurrencyConverterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
