import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BarberPro';

  @Input() loggedInUser?: firebase.default.User | null;
  constructor(private router: Router){}

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

}
