import { ServiceService } from './../../shared/service/service.service';
import { AfterViewInit, ChangeDetectorRef, Component,OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData,ChartEvent,ChartType } from 'chart.js';
import { course, Module,Topic } from 'src/app/core/interface/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, AfterViewInit  {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  moduleD!:Array<Module>
  barChartGlobal!:ChartData<'bar'>
  area:string ="Selecciona un area"
  courseD:Array<course>=[]
  TopicD:Array<Topic>=[]
  DataT:Array<Topic>=[]
  DataM:Array<Module>=[]
  dataA:Array<course>=[]
  labelGroup:string ="Información"
  label: 0 |1 = 0
  topicA:any
  valueLength =[] as any
  destructor =[] as any
  id :any
  constructor(private service:ServiceService,private cd:ChangeDetectorRef,private router:Router) {
    const navigation =  this.router.getCurrentNavigation()
    const state:any = navigation?.extras.state as {event:number,topic:any }
    if(state != undefined){
      this.id = state.event
      this.topicA = state.topic
    }
    this.topic()
    this.module()
  }

  ngAfterViewInit(): void {
    this.service.barChart.subscribe(resu=>{
      this.id = resu
      this.route(resu)
      this.tabs(1) 
      this.DataM=[];this.dataA=[]
      this.DataT=this.TopicD.filter(res=>res.ruta == resu)
      this.DataT.map(re=>{
        let data =this.moduleD.filter(m=>m.tema == re.id_tema)
        data.map(l=>{
          this.DataM.push(l)
           let dataC = this.courseD.filter(a=>a.modulo == l.id_modulo) 
            dataC.map(r=>{this.dataA.push(r)})
          })
          })
        this.randomize(this.DataT.length,this.DataM.length,this.dataA.length)
        })
        this.route(this.id)
        this.randomize(this.DataT.length,this.DataM.length,this.dataA.length)

  }
  ngOnInit() {
    this.course()
  }

module(){
  this.service.modulo$().subscribe(res=>{
    this.moduleD = res
  })
}

course(){
   this.service.curso$().subscribe(res=>{
    this.courseD =res
    const id = document.getElementById("div1")
    // if(id){
    if(this.topicA != undefined ){this.table(this.courseD,"all")}
    if(this.course != undefined && this.moduleD != undefined && this.TopicD != undefined )
    {
      this.chartJsGlobal()
      this.chartJs()
      this.route(this.id)
    }
  // }
  })}

topic(){ this.service.tema$().subscribe(res=>{this.TopicD=res})}

chartJsGlobal(){
  this.barChartGlobal= {
    labels:['N° Tema','N° Modulo','N° Curso'],
    datasets: [
            { 
              data:[this.TopicD.length,this.moduleD.length,this.courseD.length],
              label: '' ,
              backgroundColor: 'rgba(63,81,181,.15)',
              hoverBackgroundColor: '#001871',
              borderColor: '#001871',    
            }
          ]
  }; 
}

route(id:number){
  if(id){
  this.service.ruta$().subscribe(res=>{
    const {...route}=  res.find((res:any)=>res.id_ruta == this.id)
    const d:any = document.querySelector(".area")
    if(d != null){d.innerHTML = `Información sobre ${route.nombre_ruta}`}
    }) 
  }
}



  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    
    }};

    barChartData:ChartData<'bar'> ={
      labels:['N° Tema','N° Modulo','N° Curso'],
      datasets: [
          { 
            // 
            data:[0,0,0],
            label: '' ,
            backgroundColor: 'rgba(63,81,181,.15)',
            hoverBackgroundColor: '#001871',
            borderColor: '#001871',    
          }
        ]
     }; 

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

chartJs(){
    this.DataM=[];this.dataA=[]
    this.DataT=this.TopicD.filter(res=>res.ruta == this.id)
    this.DataT.map(re=>{
      let data =this.moduleD.filter(m=>m.tema == re.id_tema)
      data.map(l=>{
        this.DataM.push(l)
         let dataC = this.courseD.filter(a=>a.modulo == l.id_modulo) 
          dataC.map(r=>{this.dataA.push(r)})
        })
})
    this.randomize(this.DataT.length,this.DataM.length,this.dataA.length)
}
 

   public randomize(a:number,b:number,c:number): void { 
     try {
      const canvas = document.getElementById('2') as HTMLCanvasElement;
      if(canvas != null){
      let data =Chart.getChart('2')
      if (data != undefined) {
        data.destroy();
    } 
     new Chart(canvas, {type:'bar',data:{
      labels:['N° Tema','N° Modulo','N° Curso'],
      datasets:[{
      data:[a,b,c],
      label: '' ,
      backgroundColor: 'rgba(63,81,181,.15)',
      hoverBackgroundColor: '#001871',
      borderColor: '#001871',    
    }]}, options:this.barChartOptions})
  
    }else{
    this.ngOnInit()
    }
     } catch (error) {
       console.log("Hay un error :)",error)
     }

}

tabs(n:number){n==1?this.label = 0: this.label=1}

table(data:any,seccion:string){
  this.service.emiter.emit({data,seccion})
}

public chartClicked(data:any): void {
  if(data ==1){
  this.table(this.dataA,'all')
}else if(data ==2){
  this.table(this.courseD,'all')
}
}
}