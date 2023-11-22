import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  hairStyle = new FormControl();

  hairStyleList = ['Crop', 'Pompadour', 'Quiff', 'Slicked back', 'Flat top', 'Spiky'];
  selectedhairStyle = "";

  employees = new FormControl();

  employeesList = [];
  selectedemployees = "";

  panelOpenState = false;
  userLoggedIn = false;
  constructor(public authService: AuthService){
    this.userLoggedIn =  authService.userLoggedIn.value;
    console.log(this.userLoggedIn);
  }
}
