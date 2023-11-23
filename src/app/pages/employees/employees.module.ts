import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
        MatInputModule,
        MatRippleModule
    
  ]
})
export class EmployeesModule { }
