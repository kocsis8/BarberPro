import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEmployee: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userId: string;
  authStateSubscription: any;
 
  constructor(private router: Router, private afAuth: AngularFireAuth,  private userService: UserService) {
    this.userLoggedIn.next(false);
      this.userId ="";
      this.isEmployee.next(false);
      this.authStateSubscription = this.afAuth.onAuthStateChanged((user) => {              
          if (user) {
            this.userLoggedIn.next(true);
            this.userId = user.uid;

            userService.userById(this.userId).pipe(
              map((user: any) => {
                if (user && typeof user.employee === 'boolean') {
                  return user.employee;
                } else {
                  return false; // Alapértelmezett érték, ha nincs vagy hibás az employe mező
                }
              })
            )
            .subscribe(isEmployee => {
              this.isEmployee.next(isEmployee);
              
            });

          } else {
            this.userLoggedIn.next(false);
            this.isEmployee.next(false);
            this.userId ="";
          }
      });
  }

  loginUser(email: string, password: string): Promise<any> {
      return this.afAuth.signInWithEmailAndPassword(email, password)
          .then(() => {
              console.log('Auth Service: loginUser: success');
              // this.router.navigate(['/dashboard']);
              
          })
          .catch((error) => {
              console.log('Auth Service: login error...');
              console.log('error code', error.code);
              console.log('error', error);
              if (error.code)
                  return { isValid: false, message: error.message };

                  return { isValid: false, message: error.message };
          });
  }

  signupUser(email: string, password: string): Promise<any> {
      return this.afAuth.createUserWithEmailAndPassword(email, password);         
  }

  logout() {

   
    this.userLoggedIn.next(false);
    this.userId ="";
    this.isEmployee.next(false); 
    this.afAuth.signOut();
    this.router.navigate(['/login']);

  }

}
