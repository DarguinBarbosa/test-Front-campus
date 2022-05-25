import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form!:FormGroup
  constructor(private fb:FormBuilder,private route:Router, private service:AuthService,private toastr: ToastrService){
    this.form = this.fb.group({
      username:['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.minLength(8),Validators.maxLength(14)])],
      password:['', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(16),Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S/)])],
    })
  }

  ngOnInit(): void {
  }

  send(form:any){
    this.form.reset()
    this.service.login$(form).subscribe(res=>{
      this.route.navigate(['/','home'])
      this.toastr.info("Esta sesión terminara en una hora","Campus Russell",{positionClass:'toast-bottom-right'})
    },(error)=>{
      if(error.status != 0){
      this.toastr.error("Usuario o contraseña incorrecto","Campus Russell",{positionClass:'toast-bottom-right'})
    }

    })
  }

  getusername():any{
    if (this.form.get('username')?.hasError) {
      return 'Usuario invalido';
   }}

   getpassword():any{
    if (this.form.get('password')?.hasError) {
      return 'Contraseña invalida';
   }}
}
