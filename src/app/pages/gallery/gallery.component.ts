import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadImage } from 'src/app/shared/models/UploadImage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
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

  images: UploadImage[] = [];

  panelOpenState = false;
  userLoggedIn = false;
  constructor(public authService: AuthService, public userService: UserService,public uploadService: UploadService){
    this.userLoggedIn =  authService.userLoggedIn.value;
    console.log(this.userLoggedIn);
  }
  ngOnInit(): void {
    this.userService.allEmployeesNames().subscribe((names) => {
      this.employeesList = names;
    });

    this.uploadService.getAllImages().subscribe((images) =>{
    this.images=images;
    });
    
  }
}
