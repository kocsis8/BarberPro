import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/User';
import { EmailService } from 'src/app/shared/services/email/email.service';
import { GmailService } from 'src/app/shared/services/email/gmail.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
send() {
  if (this.contactForm.valid) {
    const subject = this.contactForm.get("subject").value;
    const message = this.contactForm.get("message").value;
    const type = this.contactForm.get("notificationType").value;
    if(type == "guest"){
      this.users.forEach(element => {
        
      });
    }

    
    if(type == "employees"){
      this.gmailService.sendEmail("teszt tárgy","teszt szöveg","kocsis.marton.pal@gmail.com");
      this.emploees.forEach(element => {

      });
    }

    this.contactForm.reset();
    this.snackBar.open(
      ' Elküleket elküldted',
      'OK',
      {duration: 5000,});
  
  }
}


  contactForm: FormGroup | any;
  emploees:User[] = [];
  users:User[] = [];
    

  constructor(private fb: FormBuilder,public userService: UserService,public emailService: EmailService, public snackBar: MatSnackBar,private gmailService: GmailService) {
    this.contactForm = this.fb.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      notificationType: ['', [Validators.required]]
    });


  }

  ngOnInit() {
    this.userService.allUsers().subscribe((users) => {
      this.users = users;
    });

    this.userService.allEmployees().subscribe((employees) => {
      this.emploees = employees;
    });
  }



}
