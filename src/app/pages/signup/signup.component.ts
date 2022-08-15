import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
    'first_name': new FormControl('', Validators.required),
    'last_name': new FormControl('', Validators.required)
  });
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {}

  signup() {
    if (this.signupForm.invalid)
      return;

    this.authService.signupUser(this.signupForm.value).then((result) => {
      if (result == null)
        this.router.navigate(['/']);
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    });
  }
}
