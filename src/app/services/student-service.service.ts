import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Student } from '../models/Student';
 
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private url = 'https://5620-181-230-219-190.ngrok.io/student'
  
  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url + '/getAll')
  }

  save(estudiante: Student): Observable<any>{
    return this.http.post(this.url,estudiante)
  }
  
  edit(estudiante: Student): Observable<any>{
    return this.http.post(this.url+'/'+estudiante.id+'/update', estudiante)
  }

  delete(id: Number): Observable<any>{
    return this.http.post(this.url+'/'+id+'/delete',null)
  }

  
}
