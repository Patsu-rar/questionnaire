import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
  }


  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid)
      return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {
        this.router.navigate(['/management']);
      }
      else if (result.isValid == false) {
        this.firebaseErrorMessage = result.message;
      }
    });

  }
}
