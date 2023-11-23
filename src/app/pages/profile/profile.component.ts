import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/shared/models/Booking';
import { BookingView } from 'src/app/shared/models/BookingView';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {

 

bookings: BookingView[] = [
  {date: "",employeeName:""}
];

displayedColumns: string[] = ['date','employeeName'];
dataSource = this.bookings;
  
  firsname: string | undefined;
  lastname: string | undefined;
  user: User | undefined;
  ngOnInit(): void {
   
  }
  updateForm: FormGroup | any;
update() {


}


constructor(public authService: AuthService, public userService: UserService){

  this.updateForm = new FormGroup({
    'firstnameC': new FormControl('', Validators.required),
    'lastnameC': new FormControl('', Validators.required),
  });

  this.userService.userById(this.authService.userId).subscribe((user: User | undefined) => {
    this.user = user;
    this.firsname = this.user?.name.firstname;
    this.lastname = this.user?.name.lastname;
  });


}

}
