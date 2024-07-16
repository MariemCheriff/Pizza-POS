import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  


import { MatSelectModule } from '@angular/material/select';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
  selector: 'app-stats:not(2)',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule,   MatInputModule, MatNativeDateModule,MatCardModule, CommonModule, FeathericonsModule,MatDatepickerModule, MatSelectModule],  
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  users = [
    { id: 1, username: 'Adam K', firstName :'Adam' , lastName:'K' ,Due : 22 },
    { id: 2, username: 'Manuel M' , firstName :'Manuel' , lastName:'M' ,Due : 67},
    { id: 3, username: 'Ciser C', firstName :'Ciser' , lastName:'C' ,Due : 70 },
    { id: 4, username: 'Sara P' , firstName :'Sara' , lastName:'P' ,Due : 92},
    { id: 5, username: 'Juthi M' , firstName :'Juthi' , lastName:'M' ,Due : 28},
    
  ];
  selectedUserId: number | null = null;
  selectedUsername: string | null = null;
  selectedlastname: string | null = null;
  selectedfirstname: string | null = null;
  selectedDue: number | null = null;

  get totalDue(): number {
    return this.users.reduce((total, user) => total + user.Due, 0);
  }

  constructor() { }

  onUserSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.options).filter(option => option.selected);

    if (selectedOptions.some(option => option.value === '')) {
      // If "All" is selected
      this.selectedUserId = null;
      this.selectedUsername = null;
      this.selectedfirstname = null;
      this.selectedlastname = null;
      this.selectedDue = null;
    } else {
      // If a specific user is selected
      const userId = parseInt(selectedOptions[0].value, 10);
      const user = this.users.find(user => user.id === userId);

      if (user) {
        this.selectedUserId = user.id;
        this.selectedUsername = user.username;
        this.selectedfirstname = user.firstName;
        this.selectedlastname = user.lastName;
        this.selectedDue = user.Due;
      } else {
        this.selectedUserId = null;
        this.selectedUsername = null;
      }
    }
  }

  showDeclareTips() {
   
  }
}
