import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators,  } from '@angular/forms';
import { MatDatepickerInputEvent,DateRange } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Booking } from 'src/app/shared/models/Booking';
import { Date } from 'src/app/shared/models/Date';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BookingService } from 'src/app/shared/services/booking/booking.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

bookingDate(booking: any) {
  this.bookingService.create(booking);
  this.router.navigate(['/profile']);
}

 



  employeesList: User[] = [];
  selectedemployees = "";

  displayedColumns: string[] = ['date', 'employeeName', 'booking'];
  freedates: Booking[] = [];
  bookedDates: string[] = [];
  allDatesInDay: string[] = [];

  dataSource = this.freedates;

  filterForm: FormGroup | any;
  user: User | any;

  constructor(private router: Router,private fb: FormBuilder, public userService: UserService, public bookingService: BookingService, public authService: AuthService) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      'employee': new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required, this.weekendValidator()])
    });

    this.userService.userById(this.authService.userId).subscribe(
      loggedUser => {
        this.user = loggedUser;
      }
    );



    this.userService.allEmployees().subscribe(
      employees => {
        this.employeesList = employees;
      }
    );
  }




  
  weekendValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = control.value;
      if (selectedDate) {
        const day = selectedDate.getDay();
        return day === 0 || day === 6 ? { weekend: true } : null;
      }
      return null;
    };
  }

  onSubmit() {
    if (this.filterForm.valid) {
      const employeeId = this.filterForm.get("employee")?.value.id;
      const employeeName = this.filterForm.get("employee")?.value.name.firstname + " " + this.filterForm.get("employee")?.value.name.lastname;
      const selectedDate = this.filterForm.get("date")?.value;
      const dateObject = new Date(selectedDate);

      const formattedDate = format(dateObject, 'EEE MMM d yyyy');

      this.calculateFreeDates(employeeId,employeeName,formattedDate);
      
    }
  }
  
  calculateFreeDates(employeeId: any, employeeName: any, selectedDate: any ) {
    for (let index = 10; index < 22; index++) {
      this.allDatesInDay.push(index + ":00 - " + index + ":50");
    }
  
    this.bookingService.getBookingDatesByEmployeeId(employeeId, selectedDate).subscribe(
      dates => {
        console.log("Dates returned by getBookingDatesByEmployeeId:", dates);

        this.bookedDates = dates;
  
        if (this.bookedDates.length === 0) {
          this.freedates = this.allDatesInDay.map(time => ({
            userId: this.authService.userId,
            userName: this.user.name.firstname + ' ' + this.user.name.lastname,
            employeeId: employeeId,
            employeeName: employeeName,
            time: time,
            date: selectedDate
          }));
        } else {
           
          this.freedates = this.allDatesInDay
          .filter(time => !this.bookedDates.includes(time))
          .map(time => ({
            userId: this.authService.userId,
            userName: this.user.name.firstname + ' ' + this.user.name.lastname,
            employeeId: employeeId,
            employeeName: employeeName,
            time: time,
            date: selectedDate
          }));
        }
       
        this.dataSource = this.freedates;
      }
    );
    
  }
}




