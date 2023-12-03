import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import * as nodemailer from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { 
    emailjs.init("na1CR7kxbSwHR334x");
  }

  async sendEmail() {
    // Hozzon létre egy szállító objektumot (transporter)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Vagy használhat egy másik e-mail szolgáltatót
      auth: {
        user: 'barberpro.no.reply@gmail.com',
        pass: 'Szakdoga1',
      },
    });
  
    // Levél konfiguráció
    const mailOptions = {
      from: 'barberpro.no.reply@gmail.com',
      to: 'kocsis.marton.pal@gmail.com',
      subject: 'Tesztlevél',
      text: 'Ez egy tesztlevél Angularból küldve.',
    };
  
    // Küldés
    const info = await transporter.sendMail(mailOptions);
  
    console.log('E-mail elküldve:', info.messageId);
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
