import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup | any;
  firebaseErrorMessage: string | any;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private userService: UserService) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }


  signup() {
    this.authService.signupUser(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).then((cred) => {
      console.log(cred);
      const user: User ={
        id: cred.user.uid as string,
        email: this.signupForm.get('email')?.value,
        name: {
          firstname: this.signupForm.get('firstname')?.value,
          lastname: this.signupForm.get('lastname')?.value
        },
        employee: false
      }
      this.userService.create(user).then(_ => {
        console.log('hozzáadás sikeres');
        this.router.navigate(['/profile']); 
      }).catch((error: any) => {
        console.log(error);
      })
    }).catch(error =>{
      console.log(error);
    });

  }
}
