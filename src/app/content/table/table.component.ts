import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/shared/service/service.service';
import { course, Module, Route, Topic } from 'src/app/core/interface/interface';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit,OnDestroy{
  settings = {
    noDataMessage:'No se han encontrado datos',
    actions:false,
    columns: {
      id_curso: {
        hide:true
      },
      nombre_tema: {
        title: 'Tema'
      },
      descripcion_m: {
        title: 'Modulo'
      },
      nombre_curso:{
        title:'curso'
      },
      course: {
        hide:true
      }
    }
  };
  name2:string ="información"
  data = [] as any;
  nameG:Array<any> =[]
  routeD:Array<Route> =[];
  suscribe = [] as any
  topicD:Array<Topic> =[];
  moduleD:Array<Module> =[];
  courseD: Array<course>=[];

  constructor(private toastr:ToastrService,private service:ServiceService,public dialog: MatDialog,private cd:ChangeDetectorRef) { }
  ngOnDestroy(): void {
    for (let i = 0; i < this.suscribe.length; i++) {
      this.suscribe[i].unsubscribe()  
    }
  }

  ngOnInit(): void {
    this.course()
    this.module()
    this.topic()
    this.route()
    this.table()
  }


  openDialog(inf:any): void {
  this.dialog.open(DialogTable, {
      width: '700px',
      data: inf
    });
  }

  allFilters(dataFilter:any){
      const course = this.courseD.find(res=> res.id_curso == dataFilter.id_curso)
      const module = this.moduleD.find(res=> res.id_modulo == course?.modulo)
      const tema = this.topicD.find(res=> res.id_tema == module?.tema)
      const route = this.routeD.find(res=> res.id_ruta == tema?.ruta)
      const dataGlobal = {course, module, tema,route}
  if(course != undefined){
  this.openDialog(dataGlobal)
} 

}
  // ---------- Global  Petitions 
  route(){
   let suscribe1 = this.service.ruta$().subscribe(res=>{
     this.routeD = res
  this.funcTable(this.courseD)

this.suscribe.push(suscribe1)
  })
 }

topic(){
  let suscribe1 =  this.service.tema$().subscribe(res=>{
      this.topicD = res 
    
    this.suscribe.push(suscribe1)
  })
    
  }

module(){
let suscribe1 =  this.service.modulo$().subscribe(res=>{
    this.moduleD = res
  this.suscribe.push(suscribe1)
})
  
}

course(){
 let suscribe1 = this.service.curso$().subscribe(res=>{
    this.courseD=res
  this.suscribe.push(suscribe1)
}) 
}

table(){
  let  suscribe1 =this.service.emiter.subscribe(({data,seccion})=>{
    console.log(data)
    switch (seccion) {
          case "all":
    this.data =[]
          this.funcTable(data)
          break;

          case "modal":
            this.allFilters(data)
            break
      default:
        break;
    }
  this.suscribe.push(suscribe1)

  })
}

  funcTable(data:any){
    this.data=[]
    for (let i = 0; i < data.length; i++) {
      const course = this.courseD.find(res=> res.id_curso ==data[i].id_curso )
      const module:any = this.moduleD.find(res=> res.id_modulo == course?.modulo)
      const tema:any = this.topicD.find(res=> res.id_tema == module?.tema)
      
      if(course != undefined){
        this.data.push({id_curso:data[i].id_curso,nombre_tema:tema.nombre_tema,descripcion_m:module.descripcion_m,nombre_curso:data[i].nombre_curso}) 
      } 
      
    }
  }
}

 






@Component({
  selector: 'app-dialog-table',
  templateUrl: 'dialog-table.html',
  styleUrls: ['./table.component.css']
})
export class DialogTable {
  constructor(
    public dialogRef: MatDialogRef<DialogTable>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}