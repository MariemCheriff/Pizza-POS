import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    CommonModule,
    FeathericonsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit {
  users = [
    { id: 1, username: 'Adam K', firstName: 'Adam', lastName: 'K', Due: 22 },
    { id: 2, username: 'Manuel M', firstName: 'Manuel', lastName: 'M', Due: 67 },
    { id: 3, username: 'Ciser C', firstName: 'Ciser', lastName: 'C', Due: 70 },
    { id: 4, username: 'Sara P', firstName: 'Sara', lastName: 'P', Due: 92 },
    { id: 5, username: 'Juthi M', firstName: 'Juthi', lastName: 'M', Due: 28 }
  ];

  selectedUserId: number | null = null;
  selectedUsername: string | null = null;
  selectedFirstName: string | null = null;
  selectedLastName: string | null = null;
  selectedDue: number | null = null;

  get totalDue(): number {
    return this.users.reduce((total, user) => total + user.Due, 0);
  }

  constructor() { }


  onUserSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.options).filter(option => option.selected);

    if (selectedOptions.some(option => option.value === '')) {
      // Si "All" est sélectionné
      this.selectedUserId = null;
      this.selectedUsername = null;
      this.selectedFirstName = null;
      this.selectedLastName = null;
      this.selectedDue = null;
    } else {
      // Si un utilisateur spécifique est sélectionné
      const userId = parseInt(selectedOptions[0].value, 10);
      const user = this.users.find(user => user.id === userId);

      if (user) {
        this.selectedUserId = user.id;
        this.selectedUsername = user.username;
        this.selectedFirstName = user.firstName;
        this.selectedLastName = user.lastName;
        this.selectedDue = user.Due;
      } else {
        this.selectedUserId = null;
        this.selectedUsername = null;
      }
    }
  }

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv) {
      modelDiv.style.display = 'block';
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv) {
      modelDiv.style.display = 'none';
    }
  }

  displayedColumns: string[] = ['tickets', 'orderType', 'server', 'due', 'total', 'priority', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  taskName: string;
  assignedTo: string;
  deadline: string;
  priority: string;
  status: any;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    taskName: 'Create A New React app',
    assignedTo: 'Alexander White',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'High',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Integrate Component Into App.js',
    assignedTo: 'Emma Anderson',
    deadline: 'Due in 4 days',
    status: { onHand: 'On Hand' },
    priority: 'Medium',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Start The Development Server',
    assignedTo: 'Noah Taylor',
    deadline: 'Due in 1 day',
    status: { urgent: 'Urgent' },
    priority: 'Low',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Perform Unit Testing',
    assignedTo: 'Sophia Williams',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'High',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Counter Component Into App.js',
    assignedTo: 'Sophia Williams',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'Medium',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Create A TodoList Component',
    assignedTo: 'Noah Taylor',
    deadline: 'Due in 1 day',
    status: { urgent: 'Urgent' },
    priority: 'Low',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Data Fetcher Component Into App.js',
    assignedTo: 'Emma Anderson',
    deadline: 'Due in 4 days',
    status: { onHand: 'On Hand' },
    priority: 'High',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Test The Todo List',
    assignedTo: 'Alexander White',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'Medium',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Start The Development Server',
    assignedTo: 'Olivia Smith',
    deadline: 'Due in 2 days',
    status: { urgent: 'Urgent' },
    priority: 'Low',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Start The Development Server',
    assignedTo: 'Olivia Smith',
    deadline: 'Due in 2 days',
    status: { urgent: 'Urgent' },
    priority: 'High',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Test The Todo List',
    assignedTo: 'Alexander White',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'Medium',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Data Fetcher Component Into App.js',
    assignedTo: 'Emma Anderson',
    deadline: 'Due in 4 days',
    status: { onHand: 'On Hand' },
    priority: 'Low',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Create A TodoList Component',
    assignedTo: 'Noah Taylor',
    deadline: 'Due in 1 day',
    status: { urgent: 'Urgent' },
    priority: 'High',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Counter Component Into App.js',
    assignedTo: 'Sophia Williams',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'Medium',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Perform Unit Testing',
    assignedTo: 'Sophia Williams',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'Low',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Start The Development Server',
    assignedTo: 'Noah Taylor',
    deadline: 'Due in 1 day',
    status: { urgent: 'Urgent' },
    priority: 'High',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Integrate Component Into App.js',
    assignedTo: 'Emma Anderson',
    deadline: 'Due in 4 days',
    status: { onHand: 'On Hand' },
    priority: 'Medium',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  },
  {
    taskName: 'Create A New React app',
    assignedTo: 'Alexander White',
    deadline: 'Due in 3 days',
    status: { active: 'Active' },
    priority: 'Low',
    action: { edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
  }
];

