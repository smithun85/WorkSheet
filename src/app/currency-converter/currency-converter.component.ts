import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  currencyForm: FormGroup | any;

  currencies:Array<any> = []
  convertedAmount: number = 0;
  fromCurrency:string = '';
  toCurrency:string= '';
  ammountCount:number = 0;
  conversionRate:number = 0;
  unique_from_Currencies:Array<any> = [];
  unique_to_Currencies:Array<any> = [];
  is_Selected_fromCurrency:boolean=false;
  comparedCurrency:Array<any> = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currencyForm = this.formBuilder.group({
      amount: ['', Validators.required],
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      total: [''],
    });

    this.currencyForm.get('total').disable()
    this.currencyForm.get('fromCurrency').valueChanges.subscribe((selectedValue:any) =>{ //valueChanges event is obseravable event
      this.fromCurrency = selectedValue
      // console.log("changed value")
      // console.log(selectedValue)
      // console.log(this.currencyForm.get('fromCurrency').value)
      // console.log(this.currencyForm.value)      //show the first old value
      // setTimeout( ()=>{
      //   console.log(this.currencyForm.value)   //show the latest value
      // });
      this.currencyConvert(selectedValue)
      this.comparedCurrency = []
      this.currencies.map( (item)=>{    
        if( this.fromCurrency ==item.from_currency){      
          this.comparedCurrency.push(item)                         
        }
      })
   });
   

    this.currencyForm.get('toCurrency').valueChanges.subscribe((selectedValue:any) =>{  
      this.toCurrency = selectedValue
      this.currencyConvert(selectedValue)        
    });

    this.currencyForm.get('amount').valueChanges.subscribe((selectedValue:any) =>{
      this.ammountCount = selectedValue;
      this.currencyConvert(selectedValue)    
    })
 
    
    this.currencies = [
      {
          "from_currency": "USD",
          "to_currency": "AUD",
          "conversion_rate": "1.5138",
          "modifiedtime": "2023-01-10 11:26:35"
      },
      {
          "from_currency": "USD",
          "to_currency": "INR",
          "conversion_rate": "70.0000",
          "modifiedtime": "2021-12-09 11:21:17"
      },
      {
        "from_currency": "USD",
        "to_currency": "GBP",
        "conversion_rate": "0.78178",
        "modifiedtime": "2021-12-09 11:21:17"
    },
    {
      "from_currency": "INR",
      "to_currency": "USD",
      "conversion_rate": "0.0122",
      "modifiedtime": "2021-12-09 11:21:17"
  },
  {
    "from_currency": "AED",
    "to_currency": "USD",
    "conversion_rate": "0.27226",
    "modifiedtime": "2021-12-09 11:21:17"
  }
  ];


  this.unique_from_Currencies =  this.currencies.filter((item:any, index:number) => {
    return this.currencies.map(mapObj => mapObj["from_currency"]).indexOf(item["from_currency"])===index
  });

  this.unique_to_Currencies =  this.currencies.filter((item:any, index:number) => {
    return this.currencies.map(mapObj => mapObj["to_currency"]).indexOf(item["to_currency"])===index
  });

  // console.log(this.unique_from_Currencies);
  // console.log(this.unique_to_Currencies);

  }


   currencyConvert(selectedValue:any){
    if(selectedValue) {
       this.currencies.map( item=>{
        if(this.fromCurrency==item.from_currency && this.toCurrency ==item.to_currency){
         this.conversionRate = item.conversion_rate
        }  
      })    
      this.convertedAmount = Math.floor(this.ammountCount * this.conversionRate*100)/100;
    }else{
      this.convertedAmount = 0;
    }
   }

}
