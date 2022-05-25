import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, enableProdMode } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ServiceService } from '../service/service.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavigationExtras, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import {course,Module,Route,Topic} from  '../../core/interface/interface'


@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
})
export class SideComponent  implements OnInit, OnDestroy{
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  mobileQuery: MediaQueryList;
  routeD!:Array<Route>
  topicD!:Array<Topic>
  isCollapsed = false
  moduleD!:Array<Module>
  courseD:Array<course>=[]
  DataTopic!:Array<Topic>
  DataModule!:Array<Module>
  DataCourse!:Array<course>
  private _mobileQueryListener: () => void;

  constructor(private toastr:ToastrService,private cookie:CookieService,private router:Router,config: NgbAccordionConfig,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service:ServiceService,private cd:ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    config.closeOthers = true;
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
        this.service.showSpiner()
      } else if (event instanceof RouteConfigLoadEnd) {
        this.service.hideSpiner()
      }

  })
}

hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.course()
    this.topic()
    this.module()
    this.route()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  TreeData(event :any){
    this.DataTopic =[]
 
    event.hasOwnProperty("panelId") ? event = event.panelId.substr(1,2): event = event  
    const data = this.topicD.filter( (res:any)=> res.ruta == event)
                data.map((item:any)=>{
                  this.DataTopic.push(item)
                })
    const navigationExtras:NavigationExtras={state:{topic:this.DataTopic,event:event}}
    this.router.navigate(['/','info'],navigationExtras)  
    this.BreadCrumbs(parseInt(event),"topic")
    this.barChart(event)
  }

  Tmodule(items:any){
    this.DataModule =[]
    items = items.panelId.substr(1,2)
    const data = this.moduleD.filter( (res:any)=> res.tema == items)
    data.map((item:any)=>{
      this.DataModule.push(item)
          })
    this.BreadCrumbs(parseInt(items),"module")
  }

  Mcourse(i:any){
    this.DataCourse =[]
    i.hasOwnProperty("panelId") ? i = i.panelId.substr(1,2): i = i    
    const data = this.courseD.filter( (res:any)=> res.modulo == i)
    data.map((item:any)=>{
      this.DataCourse.push(item) })
    this.BreadCrumbs(parseInt(i),"course")
    }
    // ---------- Global  Petitions 
    route(){
      this.service.ruta$().subscribe(res=>{
      console.log("Recibiendo")
       this.routeD = res

    }) }

  topic(){
      this.service.tema$().subscribe(res=>{
        this.topicD = res 
      
      })
    }

  module(){
    this.service.modulo$().subscribe(res=>{
      this.moduleD = res
    })
  }
  course(){
    this.service.curso$().subscribe(res=>{
      this.courseD=res
    })
}

  // Comunication with  others component

  
  sendDataComp(data:any,seccion:string){
    this.service.emiter.emit({data,seccion})
  }

  async close(e:any,inf:string){
    await  e.collapseAll()
    if(inf=="H"){
      this.router.navigate(['/','home'])
      this.BreadCrumbs('Home','topic');
    }else{
      this.router.navigate(['/','form'])
      this.BreadCrumbs('Formulario','topic');
    }
  }

  BreadCrumbs(id: string | number,seccion:string){
    console.log()
    if(typeof(id) =="number" && seccion == "topic"){
    const {...modelo} =this.routeD.find(f=> f.id_ruta == id)
    let name = modelo.nombre_ruta
    this.service.Breadcrumbs.emit({name,seccion})
    }else if(seccion == "module"){
    const {...topic}=this.topicD.find((f:any)=> f.id_tema == id) 
    let name = topic.nombre_tema
    this.service.Breadcrumbs.emit({name,seccion})
    }else if(seccion == "course"){
    const {...descripcion_m}= this.moduleD.find(f=> f.id_modulo == id) 
    let name = descripcion_m.descripcion_m
    this.service.Breadcrumbs.emit({name,seccion})
    }
    else{
    let name = id
    this.service.Breadcrumbs.emit({name,seccion})
    }
  }

  barChart(id:any){
    this.service.barChart.emit(id)
  }

 div(){
   const div:any=document.querySelector(".btn .btn-link .ng-star-inserted")
div.setAttribute('style','display:none !important')  
 }
  // Session
  
  logOut(){
    let token =  this.cookie.get("camRuss")
    this.service.logOut(token).subscribe(res=>{
    this.cookie.delete("camRuss") 
    this.toastr.info("La sesión a caducado","Campus Russell",{positionClass:'toast-bottom-right'})
      this.router.navigate(['/','Auth'])
    })
    }

}
