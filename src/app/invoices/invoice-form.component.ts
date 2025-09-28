  import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Créer une facture</h2>
    <div class="grid grid-2" style="margin-top:12px">
      <div>
        <label>Fournisseur</label>
        <input class="input" [(ngModel)]="supplierName" placeholder="ACME SARL">
      </div>
      <div>
        <label>Numéro de facture</label>
        <input class="input" [(ngModel)]="invoiceNumber" placeholder="FAC-2025-001">
      </div>
      <div>
        <label>Société</label>
        <input class="input" [(ngModel)]="company" placeholder="SOCIETE_A">
      </div>
      <div>
        <label>Montant</label>
        <input class="input" type="number" step="0.01" [(ngModel)]="amount" placeholder="1000.00">
      </div>
    </div>
    <div style="margin-top:12px">
      <button class="btn" (click)="create()" [disabled]="!isValid()">Créer</button>
    </div>
    <p class="small" style="margin-top:8px">La facture sera créée avec le statut initial <b>RECEIVED</b>.</p>
  </div>
  `
})
export class InvoiceFormComponent {
  supplierName = '';
  invoiceNumber = '';
  company = '';
  amount: number | null = null;

  constructor(private api: InvoiceService, private router: Router){}

  isValid(){
    return this.supplierName && this.invoiceNumber && this.company && this.amount && this.amount >= 0;
  }

  create(){
    if(this.amount === null) return;
    const payload = {
      supplierName: this.supplierName,
      invoiceNumber: this.invoiceNumber,
      company: this.company,
      amount: this.amount
    };
    this.api.create(payload).subscribe(() => this.router.navigateByUrl('/'));
  }

}
