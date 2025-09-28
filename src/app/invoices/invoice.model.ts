export type InvoiceStatus =
 | 'RECEIVED'
 | 'RECORDED'
 | 'BUSINESS_VALIDATION'
 | 'ACCOUNTED'
 | 'TREASURY_PREP'
 | 'PAYMENT_VALIDATION'
 | 'SIGNED';

export interface Invoice {
  id?: number;
  supplierName: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  status?: InvoiceStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
