import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit{
  hairStyle = new FormControl();

  hairStyleList = ['Crop', 'Pompadour', 'Quiff', 'Slicked back', 'Flat top', 'Spiky'];
  selectedhairStyle = "";

  employees = new FormControl();

  employeesList: string[] = [];
  selectedemployees = "";

  panelOpenState = false;
  userLoggedIn = false;
  constructor(public authService: AuthService, public userService: UserService){
    this.userLoggedIn =  authService.userLoggedIn.value;
    console.log(this.userLoggedIn);
  }
  ngOnInit(): void {
    this.userService.allEmployeesNames().subscribe((names) => {
      this.employeesList = names;
    });
  }
}
