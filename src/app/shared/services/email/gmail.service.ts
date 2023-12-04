import { Injectable } from '@angular/core';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  private readonly SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
  private readonly serviceAccountKey = require('./../../../../../credential.json');
  private jwtClient: JWT = new JWT;

  constructor() {
    this.initJWTClient();
  }

  private initJWTClient() {
    this.jwtClient = new google.auth.JWT(
      this.serviceAccountKey.client_email,
      undefined,
      this.serviceAccountKey.private_key,
      this.SCOPES
    );
  }

  async sendEmail(subject: string, body: string, to: string) {
    try {
      // Hitelesítés token beszerzése
      await this.jwtClient.authorize();

      // Az email küldése a Gmail API segítségével
      const gmail = google.gmail({ version: 'v1', auth: this.jwtClient });
      gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: this.createEmail(subject, body, to)
        }
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  private createEmail(subject: string, body: string, to: string): string {
    const email = [
      'Content-Type: text/plain; charset="UTF-8"\r\n',
      'MIME-Version: 1.0\r\n',
      'Content-Transfer-Encoding: 7bit\r\n',
      `to: ${to}\r\n`,
      `subject: ${subject}\r\n\r\n`,
      body
    ].join('');

    return Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  }
}
