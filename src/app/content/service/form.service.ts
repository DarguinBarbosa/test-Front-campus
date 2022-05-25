import {  Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { course, Module, Route, Topic } from 'src/app/core/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  URL = environment.API
  private subject = new Subject<any>();
  public event = this.subject.asObservable()
  constructor(private client:HttpClient) { }


    getAllroute$():Observable<Route[]>{
      return this.client.get<Route[]>(`${this.URL}route/list/`)
    }

    getAllTopic$():Observable<Topic[]>{
      return this.client.get<Topic[]>(`${this.URL}topic/list/`)
    }

    getAllCourse():Observable<course[]> {
      return this.client.get<course[]>(`${this.URL}course/list/`)
    }

  getAllModule$():Observable<Module[]>{
      return this.client.get<Module[]>(`${this.URL}module/list/`)
    }

    saveTopic(body:Topic):Observable<Topic>{
      return this.client.post<Topic>(`${this.URL}topic/save/`,body)
    }

    saveModule(body:Module):Observable<Module>{
      return this.client.post<Module>(`${this.URL}module/save/`,body)
    }


    savecourse$(body:FormData):Observable<any>{
      return this.client.post<course>(`${this.URL}course/save/`,body)
    }

    saveCourseUrl$(body:FormData):Observable<any>{
      return this.client.post<course>(`${this.URL}course/saveSA/`,body)
    }

    goBack(id:number):Observable<any>{
      return this.client.delete(`${this.URL}topic/back/${id}/`)
    }
}
