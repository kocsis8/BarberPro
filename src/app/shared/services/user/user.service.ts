import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionNames = 'Users';
  user : User | any;

  constructor(private afs: AngularFirestore) { }

  create(user: User){
   return this.afs.collection<User>(this.collectionNames).doc(user.id).set(user);
  }
}
