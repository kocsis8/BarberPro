import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
send() {
  console.log(this.contactForm.get('subject').value);
}


  contactForm: FormGroup | any;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      notificationType: ['', [Validators.required]]
    });

  }

  ngOnInit() {
    
  }



}
