import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailComponent } from './send-email/send-email.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { CallApiComponent } from './call-api/call-api.component';
import { CallWorkflowComponent } from './call-workflow/call-workflow.component';
import { CustomLogicComponent } from './custom-logic/custom-logic.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    SendEmailComponent,
    SendMessageComponent,
    CallApiComponent,
    CallWorkflowComponent,
    CustomLogicComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ActionFormsModule { }
