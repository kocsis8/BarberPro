import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Booking } from '../../models/Booking';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  collectionName = 'Booking';

  constructor(private afs: AngularFirestore) { }

  create(booking: Booking){
    return this.afs.collection<Booking>(this.collectionName).add(booking);
  }

  getBookingDatesByEmployeeId(employeeId: string, selectedDate: string): Observable<string[]> {
    return this.afs.collection<Booking>(this.collectionName, ref => ref.
      where('employeeId', '==', employeeId)
      .where('date', '==', selectedDate))
      .get()
      .pipe(
        map(querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data = doc.data() as Booking;
            return data.time;
          });
        })
      );
  }

  getBookingsByUserId(userId: string): Observable<Booking[]> {
    return this.afs.collection<Booking>(this.collectionName, ref => ref.where('userId', '==', userId))
    .get()
    .pipe(
      map(querySnapshot => {
        const bookings: Booking[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Booking;
          bookings.push(data);
        });

        return bookings;
      })
    );
  }

  getBookingsByEmployeeId(employeeId: string): Observable<Booking[]> {
    return this.afs.collection<Booking>(this.collectionName, ref => ref.where('employeeId', '==', employeeId))
    .get()
    .pipe(
      map(querySnapshot => {
        const bookings: Booking[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Booking;
          bookings.push(data);
        });

        return bookings;
      })
    );
  }

}
