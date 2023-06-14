import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor (private _http: HttpClient, private router: Router){
    this.signInForm= new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  signIn(){
    this._http.get<any[]>('http://localhost:3000/signupUser')
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.signInForm.value.email && a.password === this.signInForm.value.password
      });

     
      if(user){
        localStorage.setItem('token', "MYNAMEISGAURAV");
        alert('login success');
        this.signInForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert('user not found')
      }
    },
    err=>{
      alert('something went wrong')
    })
  }


}
