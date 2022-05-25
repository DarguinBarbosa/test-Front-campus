import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  nameG:Array<any> =[{name:"Home",s:"topic"}]
  stopSetTime:any
  contador= 0
  constructor(private service:ServiceService, private cookie:CookieService, private router:Router,private toastr:ToastrService) { }


  ngOnDestroy(): void {
    this.contador = 0
    clearTimeout(this.stopSetTime)
  }

  ngOnInit(): void {
    this.session()
    this.service.Breadcrumbs.subscribe(({name,seccion},)=>{
          switch (seccion) {
            case "topic":
              this.nameG =[]
              this.nameG.push({name:name,s:seccion})
              break;

            case "module":
              const topic =this.nameG.find(r=> r.s== "topic")
              this.nameG =[]
              this.nameG.push({name:topic.name,s:topic.s})
              this.nameG.push({name:name,s:seccion})
              break;

              case "course":
              const info =this.nameG.filter(r=> r.s == "topic" || r.s == "module" )
              this.nameG =[]
              info.map(data=>{
              this.nameG.push({name:data.name,s:data.s})
              })
              this.nameG.push({name:name,s:seccion})

              break;
          
            default:
              break;
          }
        
      
    })
  }
  session(){

  this.stopSetTime= setTimeout(()=>{
      let time = this.cookie.get('expiredCampuss')
      const dateS= new Date(time)
      const date = new Date()
      this.session()
      if(date.getTime() > dateS.getTime() ){
        this.toastr.success("La sesión esta proxima ha caducar","Campus Russell",
        {positionClass:'toast-bottom-right'})
        this.contador++
        console.log(this.contador)
        if(this.contador > 1){
          this.cookie.delete("camRuss")
          this.router.navigate(['/','Auth'])
        }
      }},180000) 
  }
  

}
