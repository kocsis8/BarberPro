import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'firebase/auth';
import { Booking } from 'src/app/shared/models/Booking';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BookingService } from 'src/app/shared/services/booking/booking.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UploadImage } from 'src/app/shared/models/UploadImage';
import { UploadService } from 'src/app/shared/services/upload/upload.service';

const storage = getStorage();



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})  

export class UploadComponent implements OnInit{


  constructor(public authService: AuthService, public userService: UserService, public bookingService: BookingService,public uploadService: UploadService){}

  selectedFile: File | null = null;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

upload(booking: any) {
if(this.selectedFile){
const storageRef = ref(storage,this.selectedFile.name);
const uploadTask = uploadBytesResumable(storageRef,this.selectedFile);
  

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      this.createImageDoc(booking,downloadURL);
    });
  }
);


  }
}




  hairStyle = new FormControl();

  hairStyleList = ['Crop', 'Pompadour', 'Quiff', 'Slicked back', 'Flat top', 'Spiky'];
  selectedhairStyle = "";


  bookings: Booking[] = [];

  displayedColumns: string[] = ['date','employeeName','select','style', 'upload'];
  dataSource = this.bookings;

  user: User | any;
  image: UploadImage | any;
  ngOnInit(): void {

      this.userService.userById(this.authService.userId).subscribe((user: User | any) => {
        this.user = user;
    
        if (this.user) {
          this.bookingService.getBookingsByEmployeeId(this.user.id).subscribe(bookings => {
            this.dataSource = bookings;
          });
        }
      });
    
   
  }

  createImageDoc(booking: any, downloadURL: string) {
     this.image ={
      userId: booking.userId,
      userName: booking.userName,
      tags: this.selectedhairStyle,
      url:downloadURL,
      employeeId: booking.employeeId,
      employeeName: booking.employeeName
     }

     this.uploadService.create(this.image);
  }
  
}
 
