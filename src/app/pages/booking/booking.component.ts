import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  hello(type: any, event: any) {
    if (event.value) {
      alert(event.value);
    }
  }
}
