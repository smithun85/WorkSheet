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
  fieldformData:any ;
  conditionForm: FormGroup | any;
  conditionFormData:any 
  // public result:Array<any> = [{
  //   field_Name:'',
  //   field_Type:'',
  //   required:false,
  //   condition_Operator:'',
  //   condition_Value:''
  // }]
  public result:Array<any>= []
  

  
  workflow:string[] = ['Actions', 'Conditions']
  
  actions:Array<any> = [ 
    {action:'send_Email',path:'email'},
    {action:'send_Message', path:'message'},
    {action:'call_api', path:'api'},
    {action:'call_Workflow', path: 'workflow'},
    {action:'custom_logic', path:'logic'},
  ];

  isAdd:boolean = false
  isSubmitted:boolean = false;
  isSubmittedCondition:boolean = false;
  
  fieldsType:string[] = ['text','number','email','password','radio'];
  condition_Operator:Array<any> = [
    {name:'equal to', symbol:'='},
    {name:'greater than', symbol:'>'},
    {name:'less than', symbol:'<'},
    {name:'greater than or equal to', symbol:'=>'},
    {name:'less than or equal to', symbol:'=<'},
    {name:'AND', symbol:'&&'},
    {name:'OR', symbol:'||'},
    {name:'NOT', symbol:'!'},
  ];

  actionValue:boolean = false
  conditionValue:boolean = false;
  isPlusSubmitted:boolean = false

  email_Form:boolean = false
  message_Form:boolean = false
  api_Form:boolean = false
  workflow_Form:boolean = false
  logic_Form:boolean = false
  

     
  constructor(
    private fb:FormBuilder,
    private apiService:WorksApiService,
    private router:Router
  ) {  

    // =====Action_Form:Add_Action=============
    this.fieldForm = this.fb.group({  
      fields: this.fb.array([
        // this.fb.group                //display the fieldForm before click the add_action button
        //  ({  
        //     fieldName: '',  
        //     fieldType: '',  
        //     require:''
        //   })    
      ]) ,  
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
    this.isAdd = true;
    this.fields().push(this.newField());    
  }  
     
  removeField(i:number) {  
    this.fields().removeAt(i);  
  } ;

  onSubmit() {  
    this.isSubmitted = true;
    this.fieldformData = this.fieldForm.value.fields
    // console.log(this.fieldForm.value); 
    console.log("fieldformData:",this.fieldformData); 
    this.fieldForm.reset() 

  
    for(let i=0; i < this.fieldformData.length; i++){
      console.log(this.fieldformData[i]); 
      this.result.push({"name":this.fieldformData[i].fieldName, "field_type":this.fieldformData[i].fieldType,required:this.fieldformData[i].require,"actions":[],"conditions":[]})
    }
    console.log("Result:",this.result);
  } 

 

  ngOnInit(): void { 
      // Condition Form:
    this.conditionForm = new FormGroup({
      conditionFormFields:new FormArray([])
    // field_Name:new FormControl(''),
    // field_Operator:new FormControl(''),
    // field_Value:new FormControl('')
})
  };
 
  //find the conditionFormFields in conditionForm
  conditionFormFields(): FormArray {
    return this.conditionForm.get('conditionFormFields') as FormArray
  }
  //Add a new fields
  newConditionField():FormGroup {
    return new FormGroup({
      field_Name:new FormControl(''),
      field_Operator:new FormControl(''),
      field_Value:new FormControl('')
    })
  }

  addConditionField(){
    this.isPlusSubmitted = true
    this.conditionFormFields().push(this.newConditionField())
  }

  // Action Form
  emailForm = new FormGroup({
    body:new FormControl(''),
    subject:new FormControl(''),
    to:new FormControl('')
  });

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
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "send_Message"){
    this.message_Form = true;
    this.email_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "call_api"){
    this.api_Form = true;
    this.email_Form= false
    this.message_Form= false
    this.workflow_Form= false
    this.logic_Form= false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "call_Workflow"){
    this. workflow_Form = true;
    this.email_Form= false
    this.message_Form= false
    this.api_Form= false
    this.logic_Form= false;

   
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "custom_logic"){
    this.logic_Form= true;
    this.email_Form= false
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false;  
    // console.log("Email_event",e.target.value);
   }
  }
  

  changeFieldType(e: any) { 
    let  fieldType = this.fieldForm.get('fieldType');
     fieldType?.setValue(e.target.value, {
       onlySelf: true,
     });
   };


     
  

  emailSubmit(){
console.log(this.emailForm.value);
if(this.emailForm){
  for(let i=0; i<this.result.length;i++){
    this.result[i].actions.push({"body":this.emailForm.value.body, "subject":this.emailForm.value.subject, "to":this.emailForm.value.to})   
  }
}
console.log("Result:", this.result);
  }

  messageSubmit(){
    console.log(this.messageForm.value);
    if(this.messageForm){
      for(let i=0; i<this.result.length;i++){
        this.result[i].actions.push({"body":this.messageForm.value.body, "to":this.messageForm.value.to})   
      }
    }
    console.log("Result:", this.result);
  };

  apiSubmit(){
    console.log(this.apiForm.value);
if(this.apiForm){
  for(let i=0; i<this.result.length;i++){
    this.result[i].actions.push({"body":this.apiForm.value.body, "url":this.apiForm.value.url, "type":this.apiForm.value.type})   
  }
}
console.log("Result:", this.result);
  }

  workflowSubmit(){
    console.log(this.workflowForm.value);
    if(this.workflowForm){
      for(let i=0; i<this.result.length;i++){
        this.result[i].actions.push({"workflow":this.workflowForm.value.workflow, "input_Value":this.workflowForm.value.input_Value})   
      }
    }
    console.log("Result:", this.result);
  };

  logicSubmit(){
    console.log(this.logicForm.value);
    if(this.logicForm){
      for(let i=0; i<this.result.length;i++){
        this.result[i].actions.push({"logic":this.logicForm.value})   
      }
    }
    console.log("Result:", this.result);
  }




changeFieldName(e: any) { 
//  let  field_Name = this.conditionForm.get('conditionFormFields').controls ;
//   field_Name?.setValue(e.target.value, {
//     onlySelf: true,
//   });
//   console.log("field_Name",field_Name);
};



 changeOperatorType(e: any) { 
  // let  field_Operator = this.conditionForm.get('field_Operator');
  //  field_Operator?.setValue(e.target.value, {
  //    onlySelf: true,
  //  });
  //  console.log("Field_Operator",field_Operator);
 }




  conditionSubmit(): void {
    console.log(this.conditionForm.value);
    this.isSubmitted = true;
    this.isSubmittedCondition = true
    this.conditionFormData = this.conditionForm.value.conditionFormFields
    console.log("Condition_Array:",this.conditionFormData);
    if (!this.conditionForm.valid) {
      false;
    } else {
      // console.log("Conditionform value:",JSON.stringify(this.conditionForm.value));
    }

    // this.result = [new Set([...this.fieldformData,this.conditionFormData])]

    if(this.conditionFormData){
      for(let i=0; i<this.result.length;i++){
        if(this.result[i].name === this.conditionFormData[i].field_Name){
          this.result[i].conditions.push({"operator":this.conditionFormData[i].field_Operator, "value":this.conditionFormData[i].field_Value})
        }
      }
    }
console.log("Result:", this.result);
    
  }

}