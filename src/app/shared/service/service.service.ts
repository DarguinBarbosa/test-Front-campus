import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventEmitter,Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as model from  '../../core/interface/interface'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private URL = environment.API
  @Output() emiter: EventEmitter<any> = new EventEmitter()
  @Output() course: EventEmitter<any> = new EventEmitter()
  @Output() barChart: EventEmitter<any> = new EventEmitter()
  @Output() Breadcrumbs: EventEmitter<any> = new EventEmitter()
  isloading$ = new Subject<boolean>()
  constructor(private cookie:CookieService,private Http:HttpClient) {}

  bar():Observable<any>{
    return this.barChart
  }

  ruta$():Observable<model.Route[]>{
    return this.Http.get<model.Route[]>(`${this.URL}route/list/`)
  }

  tema$():Observable<model.Topic[]>{
    return this.Http.get<model.Topic[]>(`${this.URL}topic/list/`)
  }

  modulo$():Observable<model.Module[]>{
    return this.Http.get<model.Module[]>(`${this.URL}module/list/`)
  }

  curso$():Observable<model.course[]>{
    return this.Http.get<model.course[]>(`${this.URL}course/list/`)
  }
  logOut(token:string):Observable<any>{
    return this.Http.get<any>(`${this.URL}logOut?token=${token}`).pipe(
      map(res=>{
         if(res.status == 401){
          this.cookie.delete("camRuss")  
         }
      })
    )
}

showSpiner():void{
  this.isloading$.next(true)
}
hideSpiner():void{
  this.isloading$.next(false)
}
}
