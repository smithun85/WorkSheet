import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { usersData } from '../userData/crud-data';
import { userModal } from '../modals/crud-model'

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http:HttpClient) { }

  //get the work data
  getAllData(): Observable<any> {
    return of( usersData)
 };

 //get the work data by id
 getDataById(id:number):Observable<any>{
  return new Observable( (observer)=>{
    const value =  usersData.result.find( (item:userModal)=>{item.id === id})
    observer.next(value)
  })
 }


 //Post the work data
 postUsersData(userFormData:userModal):Observable<any>{
  console.log(userFormData);
  return new Observable( (observer)=>{
    const newItem:userModal = {
      id: Math.floor(Math.random()*100+1),
      name:userFormData.name,
      address:userFormData.address,
      email:userFormData.email,
      mobile:userFormData.mobile,
      gender:userFormData.gender,
      city:userFormData.city,
      condition:userFormData.condition
    }
    observer.next( usersData.result.push(newItem))
  })
 };


 //Update Work_Data
 updateUsersData(userFormData:userModal, id:number):Observable<any>{ 
    const usersIndex =  usersData.result.findIndex( (data)=>data.id===id)
    if(usersIndex !== -1){
       usersData.result[usersIndex] = userFormData;
      return of( usersData.result[usersIndex])
    }
    return of(null)
 }

 

 //Delete Work by id:
 deleteUsersData(id:number):Observable<boolean>{
const usersIndex =  usersData.result.findIndex( (data)=> data.id === id)
if(usersIndex !== -1){
    usersData.result.splice(usersIndex,1)
   return of(true)
}
return of(false)
 }
}
