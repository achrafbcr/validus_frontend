import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceStatus, Page } from './invoice.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private base = '/api/invoices';

  private headers(): HttpHeaders {
    const h = this.auth.header() as any;
    return new HttpHeaders(h);
  }

  list(status?: InvoiceStatus, page = 0, size = 10): Observable<Page<Invoice>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<Page<Invoice>>(this.base, { params, headers: this.headers() });
  }

  create(payload: Partial<Invoice>): Observable<Invoice> {
    return this.http.post<Invoice>(this.base, payload, { headers: this.headers() });
  }

  changeStatus(id: number, next: InvoiceStatus): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.base}/${id}/status`, null, {
      params: new HttpParams().set('next', next),
      headers: this.headers()
    });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, { headers: this.headers() });
  }
}
