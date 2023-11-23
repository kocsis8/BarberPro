import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  items = ["Kyle","Eric","Bailey", "Deborah", "Glenn", "Jaco", "Joni", "Gigi"]
  term: string | any;
}
