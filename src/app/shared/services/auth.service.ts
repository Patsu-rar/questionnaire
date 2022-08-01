import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

const users: any = localStorage.getItem('users');


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  activeUser: any = JSON.parse(localStorage.getItem('activeUser')!);
  isLogged?: boolean = JSON.parse(localStorage.getItem('isLogged')!);

  constructor(private router: Router) {
    console.log(this.isLogged);
  }

  login(data : {email: string, password: string}) {
    const user = JSON.parse(users).filter((el: any) => {
      return el.email === data.email && el.password === data.password;
    });
    this.activeUser = user[0];
    if (!this.activeUser) {
      return alert('Incorrect email or password');
    } else {
      localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
      localStorage.setItem('isLogged', 'true');
      this.isLogged = true;

      return this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('activeUser');
    this.activeUser = JSON.parse(localStorage.getItem('activeUser')!);
    localStorage.setItem('isLogged', 'false');
    this.isLogged = false;

    return this.router.navigate(['/login']);
  }
}
