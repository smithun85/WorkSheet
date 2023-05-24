import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './share/form/form.component';
import { AddWorksComponent } from './operations/add-works/add-works.component';
import { EditWorksComponent } from './operations/edit-works/edit-works.component';
import { ViewListComponent } from './view-list/view-list.component';

const routes: Routes = [
  { path: '', redirectTo:'view', pathMatch: 'full' },

  {path:'view',
    component: ViewListComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
