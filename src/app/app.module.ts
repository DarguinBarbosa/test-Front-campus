import { SpinerInterceptor } from './core/spiner/spiner.interceptor';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionInterceptor } from './core/session.interceptor';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
     NgbModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [CookieService,{
    provide:HTTP_INTERCEPTORS,
    useClass:SessionInterceptor,
    multi:true
  },{
    provide:HTTP_INTERCEPTORS,
    useClass:SpinerInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
