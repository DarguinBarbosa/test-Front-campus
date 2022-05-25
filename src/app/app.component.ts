import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ServiceService } from './shared/service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-russell';
  
  constructor(private router:Router , private service:ServiceService){
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.service.showSpiner()
      } else if (event instanceof RouteConfigLoadEnd) {
        this.service.hideSpiner()
      }
    });
  }

img(event:any){
  console.log(event)
}

}
