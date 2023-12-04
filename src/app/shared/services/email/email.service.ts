import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { 
    emailjs.init("na1CR7kxbSwHR334x");
  }


  public sendMailToMe(to: string, subject: string, message: string, name: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to,
      subject,
      message,
      name,
    };
    return emailjs.send("service_9o15xs8", "template_pybb4xx", templateParams);
  }
}
