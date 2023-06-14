import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hideLoginPassword = true;
  signInForm: FormGroup;

  constructor (private _http: HttpClient, private router: Router){
    this.signInForm= new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,   Validators.minLength(4)])
    })
  }

  signIn(){
    this._http.get<any[]>('http://localhost:3000/signupUser')
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.signInForm.value.email && a.password === this.signInForm.value.password
      });

     
      if(user){
        localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImdhdXJhYiBzdWJiYSIsImVtYWlsIjoiMTQ0bGF6eUBnbWFpbC5jb20iLCJwaG9uZSI6Ijk4MDAwMDAwMCIsImlhdCI6MTUxNjIzOTAyMn0.ds1PLYv669tWIB8sNJj9OfqoLV0UZl_6jdSDKnAdneM");
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

  getErrorOnLogin(controlName: string) {
    const control = this.signInForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('minlength')) {
      return 'Password should contain min. of 8 characters';
    }
    return '';
  }
}
