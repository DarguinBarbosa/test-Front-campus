import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.API
  constructor(private client:HttpClient, private cookie:CookieService) { }


  login$(body:any):Observable<any>{
    return  this.client.post<any>(`${this.URL}login/`, body).pipe(
      tap((res:any)=>{
        const {token,user} = res
        let expired = this.timeExpired()
        console.log(expired)
        this.cookie.set('expiredCampuss',expired)
        this.cookie.set('camRuss', token, 0.04444444, '/')
      }))
  }

  timeExpired():any{
    const date = new Date
    let minutes=  date.setMinutes(date.getMinutes(),3300)
    let fecha= date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+minutes
  return date
  }
}
