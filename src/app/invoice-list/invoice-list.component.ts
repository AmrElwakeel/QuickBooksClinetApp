import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../services/invoices/invoice.service';
import { InvoiceDto } from '../services/invoices/invoice-dto.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; // Add this import for icons
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule, // Add MatIconModule for expand/collapse icons
  ],
  providers: [InvoiceService],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceDto[] = []; // Array to store invoices
  displayedColumns: string[] = ['id', 'customerRef', 'totalAmt', 'invoiceDate', 'expand']; // Columns to display in the table
  lineItemColumns: string[] = ['amount', 'description', 'detailType', 'itemRef']; // Columns for line items

  // DataSource for the table
  dataSource = new MatTableDataSource<InvoiceDto>(this.invoices);

  // Expanded row
  expandedInvoice: InvoiceDto | null = null;

  // Sorting and pagination
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices(); // Load invoices on component initialization
  }

  // Method to load invoices from the service
  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data; // Assign the fetched invoices to the array
      this.dataSource = new MatTableDataSource<InvoiceDto>(this.invoices); // Update the data source
      this.dataSource.sort = this.sort; // Enable sorting
      this.dataSource.paginator = this.paginator; // Enable pagination
    });
  }

  // Toggle expandable row
  toggleRow(invoice: InvoiceDto): void {
    this.expandedInvoice = this.expandedInvoice === invoice ? null : invoice;
  }
}