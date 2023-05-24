import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorksApiService {

  baseURL:string = 'http://192.168.196.14:6001'

  constructor(private http:HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseURL}/work_flow`)
 };

 postWorkData(formData:any):Observable<any>{
  console.log(formData);
  return this.http.post(`${this.baseURL}/work_flow`, formData)
 };


 //Update Work_Data
 updateWorkData(formData:any, id:number):Observable<any>{
  return this.http.put(`${this.baseURL}/work_flow/${id}`, formData)
 }

 //Delete Work by id:
 deleteWorkData(id:number):Observable<any>{
return this.http.delete(`${this.baseURL}/work_flow/${id}`)
 }
}
