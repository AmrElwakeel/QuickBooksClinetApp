// src/app/invoice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceDto } from './invoices/invoice-dto.model'; // Create this model

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'https://localhost:44338/api/invoices'; // Change this to your API URL

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>(this.apiUrl);
  }

  createInvoice(invoice: InvoiceDto): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(this.apiUrl, invoice);
  }
}