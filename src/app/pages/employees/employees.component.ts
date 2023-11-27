import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeView } from 'src/app/shared/models/EmployeeView';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
addEmployee(userId: any) {  
    this.userService.userById(userId).subscribe(
      (userData?: User) => {
        this.user = userData;
        // Ellenőrizzük, hogy az 'user' objektum létezik-e, mielőtt beállítanánk az 'employee' tulajdonságát
        if (this.user) {
          this.user.employee = true;
        
          this.userService.updateUser(userId, this.user).then(() => {
             
          });
        } else {
          console.error('Nincs ilyen azonosítójú felhasználó.');
        }
      },
      (error) => {
        console.error('Hiba a felhasználó adatainak lekérésekor:', error);
      }
    );
      this.fillEmployeeTable();
      this.fillUserTable();
      this.snackBar.open(
      ' egy felhasználónak fodrás jogot adtál',
        'OK',
        {duration: 1000,});
}


  user: User | any;


  removeEmployee(userId: any) {
    if (userId == this.authService.userId) {
      this.snackBar.open('magadat nem törölheted', 'OK', {
        duration: 1000,
      });
      return;
    }
  
    this.userService.userById(userId).subscribe(
      (userData?: User) => {
        // Ellenőrizd, hogy a user objektum igaz értékű-e, mielőtt hozzáférnél a tulajdonságaihoz
        if (userData) {
          this.user = userData;
          // Folytasd a kódod további részével
          this.user.employee = false;
          this.userService.updateUser(userId, this.user).then(() => {
            // Kezeld a frissítés sikerét, ha szükséges
          });
        } else {
          console.error('Nincs ilyen azonosítójú felhasználó.');
        }
      },
      (error) => {
        console.error('Hiba a felhasználó adatainak lekérésekor:', error);
      }
    );

    this.fillEmployeeTable();
    this.fillUserTable();
    this.snackBar.open(
      ' egy Fodrásznak elvetted a jogát',
      'OK',
      {duration: 1000,});
  }
  

  

  employees: EmployeeView[] | any;
  
  users: EmployeeView[] | any;

  term: string | any;
  term2: string | any;

  constructor( public userService: UserService, public authService: AuthService, public snackBar: MatSnackBar){
   
  }
  ngOnInit(): void {
    this.fillEmployeeTable();
    this.fillUserTable();
  }

  fillEmployeeTable() {
    this.userService.allEmployees().subscribe(
      (employees) => {
        // Az employees tömböt feltöltjük az EmployeeView típusú adatokkal
        this.employees = employees.map((employee) => {
          return {
            userId: employee.id,
            email: employee.email,
            name: employee.name
          };
        });
      });
  }

  fillUserTable(){
    this.userService.allUsers().subscribe(
      (users) => {
        // Az employees tömböt feltöltjük az EmployeeView típusú adatokkal
        this.users = users.map((user) => {
          return {
            userId: user.id,
            email: user.email,
            name: user.name
          };
        });
      });
  }


}




