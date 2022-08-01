import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

export const users = [
  {
    id: 1,
    first_name: "Admin",
    last_name: "DeeperSignals",
    email: "admin@deepersignals.com",
    password: "asd",
  },
  {
    id: 2,
    first_name: "User",
    last_name: "DeeperSignals",
    email: "user@deepersignals.com",
    password: "asd",
  }
]

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

  loading: boolean = false;

  constructor(private loginService: AuthService) {}

  ngOnInit(): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    return this.loginService.login(this.loginForm.value);
  }
}
