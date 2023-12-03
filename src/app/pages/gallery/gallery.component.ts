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
  selectedhairStyle: string[] = [];


  employees = new FormControl();
  employeesList: string[] = [];
  selectedemployees: string[] = [];

  images: UploadImage[] = [];
  allimages: UploadImage[] = [];

  panelOpenState = false;
  userLoggedIn = false;
  constructor(public authService: AuthService, public userService: UserService,public uploadService: UploadService){
    this.userLoggedIn =  authService.userLoggedIn.value;
    

    this.hairStyle.valueChanges.subscribe((selectedValues: string[]) => {
      this.selectedhairStyle = selectedValues.filter(value => value);
      this.images = this.allimages;
      this.filterUploadImages();
    });

    this.employees.valueChanges.subscribe((selectedValues: string[]) => {
      this.selectedemployees = selectedValues.filter(value => value);
      this.images = this.allimages;
      this.filterUploadImages();
    });
  }

  private filterUploadImages(): void {

    


  // A teljes eredeti tömb
  let filteredImages = this.images;

  // Szűrés a kiválasztott hajstílus alapján
  filteredImages = filteredImages.filter(image => {
    return this.selectedhairStyle.length === 0 ||
      this.selectedhairStyle.some(style => image.tags.includes(style));
  });

  // Szűrés a kiválasztott alkalmazott alapján
  filteredImages = filteredImages.filter(image => {
    return this.selectedemployees.length === 0 ||
      this.selectedemployees.includes(image.employeeName);
  });

  // Az eredmények beállítása
  this.images = filteredImages;

  }

  ngOnInit(): void {
    this.userService.allEmployeesNames().subscribe((names) => {
      this.employeesList = names;
    });

    this.uploadService.getAllImages().subscribe((images) =>{
    this.images=images;
    this.allimages = images;
    });
    
  }
}
