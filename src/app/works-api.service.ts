import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { workData } from './workData';
import { Works } from './works-interface';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WorksApiService {

  baseURL:string = 'http://192.168.196.14:6001';
  // baseURL:string = 'http://localhost:3000';
  

  constructor(private http:HttpClient) { }

  //get the work data
  getAllData(): Observable<any> {
    // return this.http.get(`${this.baseURL}/work_flow`)
      // ============or============
    // return new Observable( (observer)=>{
    //   observer.next(workData)
    // });
  // ============or============
    return of(workData)
 };

 //get the work data by id
 getDataById(id:number):Observable<any>{
  // return this.http.get(`${this.baseURL}/work_flow/${id}`)
  return new Observable( (observer)=>{
    const value = workData.WorkFlow.find( (item:Works)=>{item.id === id})
    observer.next(value)
  })
 }


 //Post the work data
 postWorkData(formData:Works):Observable<any>{
  console.log(formData);
  // return this.http.post(`${this.baseURL}/work_flow`,formData)
  return new Observable( (observer)=>{
    const count = workData.WorkFlow.length +1
    const newItem:Works = {
      id:workData.WorkFlow.length + 1,
      title:formData.title,
      description:formData.description,
      city:formData.city
    }
    observer.next(workData.WorkFlow.push(newItem))
    observer.next(workData.count = count)
  })
 };


 //Post the pagination and sorting Data
 postTitleAndPagination(currentPage:number, itemsPerPage:number, sortBy:any,sortType:any,searchText:string, city:string ):Observable<any>{
  return this.http.post(`${this.baseURL}/work_flow`,{currentPage,itemsPerPage, sortBy,sortType,searchText, city} )
 };


 //Update Work_Data
 updateWorkData(formData:Works, id:number):Observable<any>{
  // return this.http.put(`${this.baseURL}/work_flow/${id}`, formData)
  
    const worksIndex = workData.WorkFlow.findIndex( (data)=>data.id===id)
    if(worksIndex !== -1){
      workData.WorkFlow[worksIndex] = formData;
      return of(workData.WorkFlow[worksIndex])
    }
    return of(null)
 }

 

 //Delete Work by id:
 deleteWorkData(id:number):Observable<boolean>{
// return this.http.delete(`${this.baseURL}/work_flow/${id}`)
const worksIndex = workData.WorkFlow.findIndex( (data)=> data.id === id)
if(worksIndex !== -1){
   workData.WorkFlow.splice(worksIndex,1)
   return of(true)
}
return of(false)
 }
}
