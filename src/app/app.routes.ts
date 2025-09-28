import { Routes } from '@angular/router';
import { InvoicesListComponent } from './invoices/invoices-list.component';
import { InvoiceFormComponent } from './invoices/invoice-form.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  { path: '', component: InvoicesListComponent },
  { path: 'new', component: InvoiceFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
