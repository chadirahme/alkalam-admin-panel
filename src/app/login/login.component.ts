import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,  public authService: AuthService) { }

username: string | undefined;
password: string | undefined;
showSpinner: boolean | undefined;
error: string | undefined;

form: FormGroup = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
});

  ngOnInit() {
  }

  login() : void {
    this.showSpinner = true;
    this.authService.signIn(this.form.value)
    .subscribe(
      (response) => {                           //Next callback
        console.log('response received');
        this.router.navigate(["dashboard"]);
        //this.repos = response;
      },
      (err) => {                              //Error callback
        console.error('error caught in component');
        // console.error(err.error);
        // var json = JSON.stringify(err);
        // console.log(json);
        this.error = "INVALID CREDENTIALS";
        //this.showSpinner = false;
  
        //throw error;   //You can also throw the error to a global error handler
      });



    // if(this.form.controls['username'].value == 'admin' && this.form.controls['password'].value == 'admin')
    // {
    //  this.router.navigate(["dashboard"]);
    // }else {
    //   this.error="Invalid credentials";
    //   //alert("Invalid credentials");
    // }


  }
}