import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/shared/service/service.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinerInterceptor implements HttpInterceptor {

  constructor(private service:ServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.service.showSpiner()
    return next.handle(request).pipe(
      finalize(()=> this.service.hideSpiner())
    );
  }
}
