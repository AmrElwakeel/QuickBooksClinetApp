export interface LineItem {
    Amount: number;
    Description: string;
    DetailType: string;
    ItemRef: string;
  }

  export interface InvoiceDto {
    Id?: string;
    CustomerRef: string;
    InvoiceDate: Date;
    LineItems: LineItem[];
    TotalAmt: number;
  }