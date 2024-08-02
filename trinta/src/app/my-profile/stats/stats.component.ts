import { Component, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
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
import { FormsModule } from '@angular/forms';

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
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit {
  showMessage: boolean = false;
  clockOutMessage: string = '';
  searchTerm: string = '';
  searchTerm1: string = '';
  selectedUser: string = '';
  selectedTerminal: string = '';

  tickets = [
    { token: 'Ticket 1', orderType: 'Pizza', server: 'Ali', total: 20, due: 20 },
    { token: 'Ticket 2', orderType: 'Food', server: 'Sami', total: 50, due: 50 },
    // Ajoutez d'autres tickets ici
  ];
  filteredTickets = this.tickets;

  transactions = [
    { transactionId: 1, ticketId: '12345', gateway: 'Visa', owner: 'John Doe', cardType: 'Visa', cardNo: '**** **** 1234', cardHolder: 'John Doe', tips: 10, amount: 100, total: 110, user: 'User 1', terminal: 'Terminal 1' },
    { transactionId: 2, ticketId: '67890', gateway: 'MasterCard', owner: 'Jane Smith', cardType: 'MasterCard', cardNo: '**** **** 5678', cardHolder: 'Jane Smith', tips: 15, amount: 150, total: 165, user: 'User 2', terminal: 'Terminal 2' },
    // Ajoutez d'autres transactions ici
  ];
  filteredTransactions = this.transactions;

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

  displayedColumns: string[] = ['tickets', 'orderType', 'server', 'due', 'total', 'priority', 'action'];
  dataSource = new MatTableDataSource(this.tickets);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  closeConfirmationModal() {
    const confirmationModalElement = document.getElementById('confirmationModal');
    if (confirmationModalElement) {
      this.renderer.removeClass(confirmationModalElement, 'show');
      this.renderer.setStyle(confirmationModalElement, 'display', 'none');
      this.renderer.setAttribute(confirmationModalElement, 'aria-hidden', 'true');
      this.renderer.removeStyle(document.body, 'overflow');
      this.renderer.removeStyle(document.body, 'padding-right');
    }
  }

  clockOutUser() {
    this.showMessage = true;
    this.clockOutMessage = 'User is clocked out';

    this.closeConfirmationModal();
    this.openModal('usersClockedInModal2');
  }

  confirmClockOut() {
    // Action à effectuer lors de la confirmation de la déconnexion
    this.closeModal('usersClockedInModal2');
    // Ajoutez ici toute autre logique nécessaire
  }

  openModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.add('show');
      this.renderer.setStyle(modalElement, 'display', 'block');
      this.renderer.setAttribute(modalElement, 'aria-hidden', 'false');
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      this.renderer.setStyle(document.body, 'padding-right', '15px');
    }
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.classList.remove('show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      this.renderer.setAttribute(modalElement, 'aria-hidden', 'true');
      // Supprime le backdrop si nécessaire
      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
    }
  }

  closeAllModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
      const modalElement = modal as HTMLElement;
      modalElement.classList.remove('show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      this.renderer.setAttribute(modalElement, 'aria-hidden', 'true');
    });
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'padding-right');

    // Supprime le backdrop si nécessaire
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.remove();
    }
  }

  printMessage() {
    const printContent = document.querySelector('#usersClockedInModal2 .alert');
    if (printContent) {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title></head><body >');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
    }
  }

  searchTickets() {
    if (this.searchTerm.trim() === '') {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter(ticket =>
        ticket.token.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.orderType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.server.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.total.toString().includes(this.searchTerm) ||
        ticket.due.toString().includes(this.searchTerm)
      );
    }
  }

  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction =>
      (this.searchTerm1.trim() === '' || transaction.ticketId.includes(this.searchTerm1)) &&
      (this.selectedUser === '' || transaction.user === this.selectedUser) &&
      (this.selectedTerminal === '' || transaction.terminal === this.selectedTerminal)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchTerm1 = '';
    this.selectedUser = '';
    this.selectedTerminal = '';
    this.filteredTickets = this.tickets;
    this.filteredTransactions = this.transactions;
  }

  get totalDue(): number {
    return this.users.reduce((total, user) => total + user.Due, 0);
  }

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

  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectToMyProfile() {
    this.closeAllModals(); // Fermer tous les modals ouverts
    this.router.navigate(['./my-profile']); // Rediriger vers ./my-profile
  }

  // Nouvelles fonctions pour storestatusModal

  generateReport() {
    // Logique pour générer un rapport
    console.log('Generating report...');
    // Ajoutez votre logique pour générer un rapport ici
  }

  viewHistory() {
    // Logique pour afficher l'historique
    console.log('Viewing history...');
    // Ajoutez votre logique pour afficher l'historique ici
  }

  closeStore() {
    // Logique pour fermer le magasin
    console.log('Closing store...');
    // Ajoutez votre logique pour fermer le magasin ici
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


