import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor( private _http: HttpClient , private router: Router) {
    this.signUpForm= new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      number: new FormControl(),
      password: new FormControl()
    })
  }

  signUp() { 
    this._http.post<any>("http://localhost:3000/signupUser",this.signUpForm.value)
    .subscribe(res=>{
      alert('signup success');
      this.signUpForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert('something went wrong')
    })
   }

}
