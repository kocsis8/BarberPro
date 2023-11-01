import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav'
import { AuthService } from './shared/services/auth/auth.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'BarberPro';


  constructor(private router: Router, public authService: AuthService, private userSrvice: UserService){}

loggedInUser?: boolean;
  
  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  ngOnInit() {
   
  }

  }


