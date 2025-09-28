import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Invoice, InvoiceStatus, Page } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <div class="grid grid-2" style="align-items:end">
      <div>
        <h2>Liste des factures</h2>
        <p class="small">Filtrer par statut & rechercher</p>
      </div>
      <div class="search">
        <select class="input" [(ngModel)]="statusFilter" (ngModelChange)="refresh()">
          <option [ngValue]="undefined">Tous les statuts</option>
          <option *ngFor="let s of statuses" [ngValue]="s">{{s}}</option>
        </select>
        <input class="input" placeholder="Rechercher (fournisseur, numéro, société)" [(ngModel)]="q">
      </div>
    </div>

    <div style="overflow:auto">
      <table>
        <thead>
          <tr>
            <th>#</th><th>Fournisseur</th><th>Numéro</th><th>Société</th><th>Montant</th><th>Statut</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let inv of filtered()">
            <td>{{inv.id}}</td>
            <td>{{inv.supplierName}}</td>
            <td>{{inv.invoiceNumber}}</td>
            <td>{{inv.company}}</td>
            <td>{{inv.amount | number:'1.2-2'}}</td>
            <td><span class="badge {{inv.status}}">{{inv.status}}</span></td>
            <td style="white-space:nowrap">
              <select class="input" [ngModel]="inv.status" (ngModelChange)="onChangeStatus(inv, $event)">
                <option *ngFor="let s of statuses" [ngValue]="s">{{s}}</option>
              </select>
              <button class="btn" style="margin-left:6px" (click)="onDelete(inv)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
      <div class="small">Page {{page+1}} / {{totalPages}} — {{totalElements}} éléments</div>
      <div>
        <button class="btn" [disabled]="page===0" (click)="setPage(page-1)">Préc.</button>
        <button class="btn" style="margin-left:6px" [disabled]="page>=totalPages-1" (click)="setPage(page+1)">Suiv.</button>
      </div>
    </div>
  </div>
  `
})
export class InvoicesListComponent implements OnInit {
  statuses: InvoiceStatus[] = ['RECEIVED','RECORDED','BUSINESS_VALIDATION','ACCOUNTED','TREASURY_PREP','PAYMENT_VALIDATION','SIGNED'];
  statusFilter?: InvoiceStatus;
  q = '';
  page = 0;
  size = 10;

  data: Page<Invoice> = { content: [], totalElements: 0, totalPages: 0, number: 0, size: this.size };

  totalPages = 0;
  totalElements = 0;

  constructor(private api: InvoiceService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.api.list(this.statusFilter, this.page, this.size).subscribe(p => {
      this.data = p;
      this.totalPages = p.totalPages;
      this.totalElements = p.totalElements;
    });
  }

  refresh(){ this.page = 0; this.load(); }

  setPage(p:number){ this.page = p; this.load(); }

  filtered(){
    const f = (this.q||'').toLowerCase().trim();
    if(!f) return this.data.content;
    return this.data.content.filter(x =>
      [x.supplierName, x.invoiceNumber, x.company].join(' ').toLowerCase().includes(f)
    );
  }

  onChangeStatus(inv: Invoice, next: InvoiceStatus){
    if(!inv.id) return;
    this.api.changeStatus(inv.id, next).subscribe(updated => {
      inv.status = updated.status;
    });
  }

  onDelete(inv: Invoice){
    if(!inv.id) return;
    if(confirm('Supprimer cette facture ?')){
      this.api.remove(inv.id).subscribe(() => this.load());
    }
  }
}
