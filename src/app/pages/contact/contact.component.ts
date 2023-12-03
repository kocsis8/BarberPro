import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/shared/services/email/email.service';

@Component({
  selector: 'contact-app',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {



  contactForm: FormGroup | any;
  name: string | any;

  constructor(private fb: FormBuilder, public emailService: EmailService, public snackBar: MatSnackBar) {}

  
  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.name = "én "+this.contactForm.get("name").value+" ("+this.contactForm.get("email").value+")";
      this.emailService.sendMailToMe("barberpro.no.reply@gmail.com", "Kapcsolat felvétel",this.contactForm.get("message").value,this.name);
      this.contactForm.reset();
      this.snackBar.open(
        ' Elkülted az emailt felénk',
        'OK',
        {duration: 5000,});
    }
  }

}
