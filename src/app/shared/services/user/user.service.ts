import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

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

  userById(userId: string){
    return this.afs.collection<User>(this.collectionNames).doc(userId).valueChanges();
  }

  allEmployeesNames(){
    return this.afs.collection<User>(this.collectionNames, ref => ref.where('employee', '==', true))
    .get()
    .pipe(
      map(querySnapshot => {
        const employees: string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as User;
          employees.push( data.name.firstname +' '+ data.name.lastname  );
        });

        return employees;
      })
    );
  }

  allEmployees() {
    return this.afs.collection<User>(this.collectionNames, ref => ref.where('employee', '==', true))
      .get()
      .pipe(
        map(querySnapshot => {
          const employees: User[] = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data() as User;
            employees.push(data);
          });

          return employees;
        })
      );
  }

}
