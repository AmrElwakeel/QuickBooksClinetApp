import { CommonModule } from '@angular/common'; // Add this import
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this import for ngModel
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'; // Add this import for buttons
import { InvoiceService } from '../services/invoices/invoice.service';
import { InvoiceDto } from '../services/invoices/invoice-dto.model';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers:[
    InvoiceService
  ],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {
  // Define the invoice object
  invoice: InvoiceDto = {
    CustomerRef: '',
    InvoiceDate: new Date(),
    LineItems: [],
    TotalAmt: 0,
  };

  constructor(private invoiceService: InvoiceService) {}

  // Method to add a new line item
  addLineItem() {
    this.invoice.LineItems.push({
      Amount: 0, // Change from '' to 0 for number input
      Description: '',
      DetailType: 'SalesItemLineDetail',
      ItemRef: '',
    });
  }

  // Method to remove a line item by index
  removeLineItem(index: number) {
    this.invoice.LineItems.splice(index, 1);
  }

  // Method to handle invoice creation
  createInvoice() {
    this.invoiceService.createInvoice(this.invoice).subscribe((data) => {
      console.log('Invoice created:', data);
      // Reset the form after successful creation
      this.invoice = {
        CustomerRef: '',
        InvoiceDate: new Date(),
        LineItems: [],
        TotalAmt: 0,
      };
    });
  }
}