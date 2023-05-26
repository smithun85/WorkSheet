import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup,FormControl, Validators} from '@angular/forms';
import { WorksApiService } from '../works-api.service';
import { Works } from '../works-interface';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-input-fields',
  templateUrl: './add-input-fields.component.html',
  styleUrls: ['./add-input-fields.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AddInputFieldsComponent implements OnInit{ 


  workData?:Works 
  fieldForm: FormGroup;
  
  workflow:string[] = ['Actions', 'Conditions']
  
  actions:Array<any> = [ 
    {action:'send_Email',path:'email'},
    {action:'send_Message', path:'message'},
    {action:'call_api', path:'api'},
    {action:'call_Workflow', path: 'workflow'},
    {action:'custom_logic', path:'logic'},
  ];

  conditions:Array<any>=[
    {condition:'fields'},
    {condition:'options'},
    {condition:'value'},
  ]


  isSubmitted = false;
  fieldsName: string[] = ['input', 'textArea', 'radio button', 'select'];

  actionValue:boolean = false
  conditionValue:boolean = false;

  email_Form:boolean = false
  message_Form:boolean = false
  api_Form:boolean = false
  workflow_Form:boolean = false
  logic_Form:boolean = false

  condition_Field:boolean = false
  condition_Option:boolean = false
  condition_Value:boolean = false

     
  constructor(
    private fb:FormBuilder,
    private apiService:WorksApiService,
    private router:Router
  ) {  
     
    this.fieldForm = this.fb.group({  
      fields: this.fb.array([]) ,  
    });  

  }  ;

  //find the fields in fieldForm
  fields() : FormArray {  
    return this.fieldForm.get("fields") as FormArray  
  }  
  
  //add a new fields
  newField(): FormGroup {  
    return this.fb.group({  
      fieldName: '',  
      fieldType: '',  
      require:''
    })  
  }  
     
  addField() {  
    this.fields().push(this.newField());  
  }  
     
  removeField(i:number) {  
    this.fields().removeAt(i);  
  }  

 

  ngOnInit(): void { }

  emailForm = new FormGroup({
    body:new FormControl(''),
    subject:new FormControl(''),
    to:new FormControl('')
  });

  // send_message:
  messageForm = new FormGroup({
    body:new FormControl(''),
    to:new FormControl('')
  });

  apiForm = new FormGroup({
    url:new FormControl(''),
    type:new FormControl(''),
    body:new FormControl(''),   
  });

  workflowForm = new FormGroup({
    workflow:new FormControl(''),
    input_Value:new FormControl(''),  
  });

  logicForm = new FormControl('')



  // getDataById(){
  //   this.apiService.getDataById()
  //   .subscribe(data => {
  //    this.workData=data.data.WorkFlow
  //     // console.log(data.data.WorkFlow)
  //   });
  // }
   
  
  

  changedOption(e:any){
   
   if(e.target.value==="Actions"){
    this.actionValue = true
    this.conditionValue = false
    // console.log("event",e.target.value);
    this.condition_Value = false
    this.condition_Field = false
    this.condition_Option = false;
   }
   if(e.target.value==="Conditions"){
    this.conditionValue = true
    this.actionValue = false
    // console.log("event",e.target.value);
    this.email_Form = false;
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false
   }
  };

  changedActions(e:any){
   if(e.target.value === "send_Email"){
    this.email_Form = true;
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false

    this.condition_Value = false
    this.condition_Field = false
    this.condition_Option = false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "send_Message"){
    this.message_Form = true;
    this.email_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false;

    this.condition_Value = false
    this.condition_Field = false
    this.condition_Option = false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "call_api"){
    this.api_Form = true;
    this.email_Form= false
    this.message_Form= false
    this.workflow_Form= false
    this.logic_Form= false;

    this.condition_Value = false
    this.condition_Field = false
    this.condition_Option = false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "call_Workflow"){
    this. workflow_Form = true;
    this.email_Form= false
    this.message_Form= false
    this.api_Form= false
    this.logic_Form= false;

    this.condition_Value = false
    this.condition_Field = false
    this.condition_Option = false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "custom_logic"){
    this.logic_Form= true;
    this.email_Form= false
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false;

    this.condition_Value = false
    this.condition_Field = false
    this.condition_Option = false;
    // console.log("Email_event",e.target.value);
   }
  }

  changedConditions(e:any){
    if(e.target.value === 'fields'){
      this.condition_Field = true
      this.condition_Option = false;
      this.condition_Value = false;

      this.logic_Form= false;
      this.email_Form= false
      this.message_Form= false
      this.api_Form= false
      this.workflow_Form= false;
    }
    if(e.target.value === 'options'){
      this.condition_Option = true;
      this.condition_Field = false      
      this.condition_Value = false;

      this.logic_Form= false;
      this.email_Form= false
      this.message_Form= false
      this.api_Form= false
      this.workflow_Form= false;
    };
    if(e.target.value === 'value'){
      this.condition_Value = true
      this.condition_Field = false
      this.condition_Option = false;

      this.logic_Form= false;
      this.email_Form= false
      this.message_Form= false
      this.api_Form= false
      this.workflow_Form= false;
    }

  }
  
     
  onSubmit() {  
    console.log(this.fieldForm.value);  
  }  

  emailSubmit(){
console.log(this.emailForm.value);
  }

  messageSubmit(){
    console.log(this.messageForm.value);
  };

  apiSubmit(){
    console.log(this.apiForm.value);
  }

  workflowSubmit(){
    console.log(this.workflowForm.value);
  };

  logicSubmit(){
    console.log(this.logicForm.value);
  }





  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]],
  });
  changeCity(e: any) {
    this.cityName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get cityName() {
    return this.registrationForm.get('cityName');
  }
  conditionSubmit(): void {
    console.log(this.registrationForm);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.registrationForm.value));
    }
  }

}
