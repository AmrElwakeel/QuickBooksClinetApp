import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

export const routes: Routes = [
    { path: '', redirectTo: '/invoices', pathMatch: 'full' },
    { path: 'invoices', component: InvoiceListComponent },
    { path: 'create-invoice', component: CreateInvoiceComponent },
  ];
