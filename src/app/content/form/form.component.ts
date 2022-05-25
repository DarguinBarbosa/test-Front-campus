import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import  {Location} from '@angular/common'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { course, Module, Route, Topic } from 'src/app/core/interface/interface';
import { FormService } from '../service/form.service';
import { ServiceService } from 'src/app/shared/service/service.service';
import { DialogTable } from '../table/table.component';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  otherTopic:string ="Registrar nuevo Tema"
  otherModule:string ="Registrar nuevo Modulo"
  pattern=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  archivo = false
  urlArchivo = true
  isEditable = true;
  idModulo:any
  routeD:Array<Route> =[]
  courseD:Array<course> =[]
  moduleD:Array<Module> =[]
  topicD:Array<Topic> =[]
  storageM:Array<Module> =[]
  storageT:Array<Topic> =[]
  arc = []as any
  firstForm = this._formBuilder.group({
    area:['',Validators.required],
    tema:['',Validators.required],
    modulo:['',Validators.required]
  })
  secondFormGroup = this._formBuilder.group({
    id_curso:[''],
    nombre_curso:['',Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(200)])],
    calificacion:['',Validators.compose([Validators.required])],
    descripcion_contenido:['',Validators.compose([Validators.required,Validators.minLength(15), Validators.maxLength(700)])],
    areas_BP:['',Validators.compose([Validators.required])],
    areas_OP:['' ,Validators.compose([Validators.required])],
    cargo_BP:['',Validators.compose([Validators.required])],
    cargo_OP:['',Validators.compose([Validators.required])],
    HCertificado:['',Validators.compose([Validators.required,Validators.min(0)])],
    C_P_evalucion:['',Validators.compose([Validators.required, Validators.min(1)])],
    Ciudad:['',Validators.compose([Validators.required])],
    T_M_Evaluacion:['',Validators.compose([Validators.required,Validators.min(1)])],
    observaciones:['',Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(300)])]
  });
  thirdFormGroup = this._formBuilder.group({
    name:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$'),Validators.minLength(4),Validators.maxLength(50)])],
    last_name:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$'),Validators.minLength(10),Validators.maxLength(70)])],
    email:['',Validators.compose([Validators.required,Validators.email])],
    archivos:[''],
    
    urlArchivo:['',Validators.compose([Validators.required,Validators.pattern(this.pattern)])]
  });

  stepperOrientation: Observable<StepperOrientation>;
   cargos=["ASISTENTE JUNIOR","ASISTENTE I","ASISTENTE II","SEMI SENIOR","SENIOR I","SENIOR II","SUPERVISOR/ACTING MANAGER",
            "GERENTE","GERENTE SENIOR","DIRECTOR","SALARY PARTNER","SOCIO"]
    city=["Barranquilla","Bogotá D.C","Cartagena","Cali","Medellin"]
    selectA=["Link de la carpeta en oneDrive","Subir archivos comprimidos"]
    select ="Link de la carpeta en oneDrive"
  constructor(private _bottomSheet: MatBottomSheet,private Service:FormService,private spiner:ServiceService,private toastr:ToastrService,public dialog: MatDialog,private _formBuilder: FormBuilder,breakpointObserver: BreakpointObserver,private cd:ChangeDetectorRef,public loc:Location) {
      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)').pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));} 

  ngOnInit(): void {
    this.cd.detectChanges()
    this.Route()
    this.topic()
    this.module()
    this.course()
  }

  ngAfterContentChecked(){
    this.cd.detectChanges()
  }

  openDialog(inf:string): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '500px',
      data: {name:inf, nameR: ""},
    });
    dialogRef.afterClosed().subscribe(res=> {
      if(res){
        if(res.name == "Tema"){
          this.otherTopic = res.nameR
          this.searchT(this.otherTopic)
        }else if(res.name == "Modulo"){
          this.otherModule = res.nameR
          this.searchT( this.otherModule)
        }
       } else{
        if(this.otherTopic=="Registrar nuevo Tema"){
          this.firstForm.get("tema")?.reset()
          this.firstForm.get("modulo")?.reset()
        }
        else if(this.otherModule=="Registrar nuevo Modulo"){
        this.firstForm.get("modulo")?.reset()}
    }
    });
  }


  send(data2:any, data1:any){
  if(this.firstForm.get("tema")?.value =="otro"){
    const data:Topic ={ nombre_tema : this.otherTopic, ruta:this.firstForm.get("area")?.value }
    this.Service.saveTopic(data).subscribe(res=>{
        const dataM:Module ={descripcion_m:this.otherModule, tema:res.id_tema}
        this.Service.saveModule(dataM).subscribe(re=>{
         this.idModulo = re.id_modulo
         this.sendTopic(data2, data1)
        })
    })
}else if(this.firstForm.get("modulo")?.value =="otro"){
  const dataM:Module ={descripcion_m:this.otherModule, tema:this.firstForm.get("tema")?.value }
  this.Service.saveModule(dataM).subscribe(re=>{
   this.idModulo = re.id_modulo
   this.sendTopic(data2, data1)
  })
}else{
 this.idModulo= this.firstForm.get("modulo")?.value 
 this.sendTopic(data2, data1)
}  
  }

  sendTopic(data2:any, data1:any){
    this.spiner.showSpiner()
    const d = new FormData()
    d.append('urlArchivo',data2.urlArchivo)
    d.append('archivos',data2.archivos) 
    d.append('nombre_curso', data1.nombre_curso) 
    d.append('calificacion',data1.calificacion.toString()) 
    d.append('descripcion_contenido', data1.descripcion_contenido) 
    d.append('areas_BP', data1.areas_BP.toString()) 
    d.append('areas_OP', data1.areas_OP.toString()) 
    d.append('cargo_BP', data1.cargo_BP.toString()) 
    d.append('cargo_OP', data1.cargo_OP.toString()) 
    d.append('HCertificado',data1.HCertificado) 
    d.append('C_P_evalucion', data1.C_P_evalucion) 
    d.append('Ciudad', data1.Ciudad.toString()) 
    d.append('T_M_Evaluacion', data1.T_M_Evaluacion) 
    d.append('observaciones', data1.observaciones) 
    d.append('modulo', this.idModulo) 
    d.append('nombre', data2.name) 
    d.append('apellidos', data2.last_name) 
    d.append('correo', data2.email) 
  if(this.urlArchivo){
    this.Service.saveCourseUrl$(d).subscribe(res=>{
     let dataP={"ingreso":"",course:res.data[1],module:res.data[0],tema:res.data[0],route:res.data[0]}
      this.openDialog2(dataP)
    },err=>{
      this.spiner.hideSpiner()
    let sus:any  = this.Service.goBack(this.idModulo).subscribe(r=>sus.unsubscribe())
      this.toastr.error("A ocurrido un error, verifica los campos","Campus Russell",{positionClass:'toast-bottom-right'})
    })  
  }else{
    this.Service.savecourse$(d).subscribe(res=>{
      let dataP={"ingreso":"",course:res.data[1],module:res.data[0],tema:res.data[0],route:res.data[0]}
      this.openDialog2(dataP)
    },err=>{
      this.spiner.hideSpiner()
      if(err.error.msj == "No fue posible guardar los archivos"){
        this.toastr.error("No fue posible guardar los archivos, comparte el link","Campus Russell",{positionClass:'toast-bottom-right'})
        this.thirdFormGroup.get("archivos")?.reset()
        let p= <HTMLInputElement>document.getElementById('file')
        p != null ? p.value='' : p=p
       let sus:any= this.Service.goBack(this.idModulo).subscribe(r=>sus.unsubscribe())
      }else{
       let sus:any= this.Service.goBack(this.idModulo).subscribe(r=>sus.unsubscribe())
        this.toastr.error("A ocurrido un error, verifica los campos","Campus Russell",{positionClass:'toast-bottom-right'})
      }
    })
  }

  }

 
  searchT(data:any){
    console.log(data)
    if(data.hasOwnProperty("id_ruta")){
    this.storageT = this.topicD
      const resultSearch = this.storageT.filter(d=> d.ruta == data.id_ruta)
      this.storageT = resultSearch
      this.storageM =[]
    }else if(data.hasOwnProperty("id_tema")){
      this.storageM = this.moduleD
      const resultSearch = this.storageM.filter(d=> d.tema == data.id_tema)
      this.storageM = resultSearch
  }else if(data=='1'){this.storageM=[]
  }else{
      if(data.length > 3){
      setTimeout(()=>{
        const dataC:any = this.courseD.map(i=>i.nombre_curso.toUpperCase().split(" ").join(""))
        const datos:any = this.topicD.map(i=>i.nombre_tema.toUpperCase().split(" ").join(""))
        const datosM:any = this.moduleD.map(i=>i.descripcion_m.toUpperCase().split(" ").join(""))
        data=data.toUpperCase()
        if(datosM.find((d:any)=> data.split(" ").join("")==d))
        {
        this.toastr.error("Ya se encuentra registrado","Campus Russell", { positionClass: 'toast-bottom-right' })
        this.firstForm.get("modulo")?.reset()
        this.otherModule = "Registrar nuevo Tema"}else
        if(datos.find((d:any)=> data.split(" ").join("")==d))
        { 
        this.toastr.error("Ya se encuentra registrado","Campus Russell", { positionClass: 'toast-bottom-right' })
        this.firstForm.get("tema")?.reset();this.otherTopic="Registrar nuevo Modulo"}

        else if(dataC.find((d:any)=> data.split(" ").join("")==d)){
          this.toastr.error("Ya se encuentra registrado","Campus Russell", { positionClass: 'toast-bottom-right' })
          this.secondFormGroup.get('nombre_curso')?.reset()
        }
      },2000)
      }
      
    }
  }

  change(even:any){
    this.thirdFormGroup.get("archivos")?.reset()
    this.thirdFormGroup.get("urlArchivo")?.reset()
    this.thirdFormGroup.get("archivos")?.clearValidators()
    this.thirdFormGroup.get("archivos")?.updateValueAndValidity();
    this.thirdFormGroup.get("urlArchivo")?.clearValidators()
    this.thirdFormGroup.get("urlArchivo")?.updateValueAndValidity();
    console.log(even)
    if(even == "Link de la carpeta en oneDrive"){
      this.archivo = false
      this.urlArchivo = true
      this.thirdFormGroup.get("urlArchivo")?.setValidators([Validators.required,Validators.pattern(this.pattern)]);
      this.thirdFormGroup.get("urlArchivo")?.updateValueAndValidity();
    }else if(even =="Subir archivos comprimidos"){
      this.urlArchivo = false
      this.archivo = true
      this.thirdFormGroup.get("archivos")?.setValidators([Validators.required]);
      this.thirdFormGroup.get("archivos")?.updateValueAndValidity();
     let p= <HTMLInputElement>document.getElementById('file')
      p != null ? p.value='' : p=p
    }
  }

  validateArchivo(e:any){
    var arcInput:any = document.getElementById('file')
    var extPermitidas=/(.rar)$/i
    var extPermitidaszip=/(.zip)$/i
    if(extPermitidas.exec(arcInput.value) || extPermitidaszip.exec(arcInput.value)){
     this.recarga(e)
     this.toastr.info('Archivo cargado',"Russell Bedford RBG", { positionClass: 'toast-bottom-right' })
    }else{
      this.toastr.error('Solo se puede subir RAR o zip',"Russell Bedford RBG", { positionClass: 'toast-bottom-right' })
      arcInput.value=''
    }
}

  recarga(event:any){
    if (event.target.files && event.target.files.length) {
      Array.from(event.target.files).forEach((f:any) => {
      this.thirdFormGroup.patchValue({
          archivos:event.target.files[0]
        })
    })}
  }

  Route(){
    this.Service.getAllroute$().subscribe(res=>{
      this.routeD = res
    })
  }

  course(){
    this.Service.getAllCourse().subscribe(res=>{
     this.courseD= res
    })
  }
  topic(){
    this.Service.getAllTopic$().subscribe(res=>{
      this.topicD = res 
    })}

  module(){
    this.Service.getAllModule$().subscribe(res=>{
      this.moduleD = res 
    })
  }

refresh(){
    this.spiner.hideSpiner()
    window.location.href="http://localhost:4200/home"
  }

  openDialog2(data:any): void {
    this.toastr.success("El curso a sido agregado correctamente", "Campus Russell", { positionClass: 'toast-bottom-right' })
   data.ingreso= `EL curso ${data.course.nombre_curso} a sido registrado `
   const dialogRef= this.dialog.open(DialogTable, {
        width: '700px',
        data:data
      });
      dialogRef.afterClosed().subscribe(res=> {
        this.refresh()
      });
    }
    
    openBottomSheet(id:number): void {
      this._bottomSheet.open(infoInput,{data:{info:id}});
    }

  getCourse():any{
    if(this.secondFormGroup.get("nombre_curso")?.hasError('minlength')){
      return "El nombre del curso es demasiado corto"
    }else if(this.secondFormGroup.get("nombre_curso")?.hasError('maxlength')){
      return "El nombre del curso es demasiado grande"
    }else if(this.secondFormGroup.get("nombre_curso")?.hasError('pattern')){
      return "Solo se permiten letras"
    }
  }
  getURL():any{
   if(this.thirdFormGroup.get("urlArchivo")?.hasError('pattern')){
      return "Url invalida"
    }
  }
 
}











@Component({
  selector: 'app-dialog-name',
  templateUrl: 'dialog-name.html',
})
export class Dialog {
  form2!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder
  ) {
      this.form2 = this.fb.group({input:['',Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(200)])]})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getError():any{
    if(this.form2.get("input")?.hasError('minlength')){
      return "La Información agregada es demasiado corta"
    }else if(this.form2.get("input")?.hasError('maxlength')){
      return "La Información agregada es demasiado grande"
    }else if(this.form2.get("input")?.hasError('pattern')){
      return "Solo se permiten letras"
    }
  }
}


@Component({
  selector: 'app-info-input',
  templateUrl: 'info-input.html',
})
export class infoInput {
  constructor( @Inject(MAT_BOTTOM_SHEET_DATA  ) public data: any){}
  
}