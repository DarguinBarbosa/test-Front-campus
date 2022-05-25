import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private cookie:CookieService, private route:Router , private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookie.get('camRuss')
      if(token){
        let newRequest = request
        newRequest = request.clone({
          setHeaders:{
            authorization:`token ${token}`
          }
        })
        return next.handle(newRequest).pipe(
          catchError((err:any)=>{
            if(err.status == 401){
              this.cookie.delete('camRuss')
              this.route.navigate(['Auth'])
    
            } else if(err.status == 0){
              this.toastr.error("Error en el servidor","Campus Russell",{positionClass:'toast-bottom-right'})
            }else{
              this.toastr.info("Vuelve a intentarlo","Campus Russell",{positionClass:'toast-bottom-right'})
            }
          return throwError(err)
        })
        );
      }
      else{
        return next.handle(request).pipe(
          catchError((err:any)=>{
            if(err.status == 401){
              this.cookie.delete('camRuss')
              this.route.navigate(['Auth'])
              this.toastr.info("No existe una sesión","Campus Russell",{positionClass:'toast-bottom-right'})

            } else if(err.status == 0){
              this.toastr.error("Error en el servidor","Campus Russell",{positionClass:'toast-bottom-right'})
            }else{
              this.toastr.success("Vuelve a intentarlo","Campus Russell",{positionClass:'toast-bottom-right'})
            }
          return throwError(err)
        })
        );
      }
    } catch (e:any) {
      if(e.status){
        console.log(e.status)
      }
      console.log("salio mal")
        return next.handle(request)

      }

  }
}
