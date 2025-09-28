import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Connexion</h2>
    <p class="small">Entrez vos identifiants Basic Auth (démo : <b>admin/admin123</b>).</p>
    <div class="grid grid-2" style="max-width:560px">
      <div>
        <label>Utilisateur</label>
        <input class="input" [(ngModel)]="username" placeholder="admin">
      </div>
      <div>
        <label>Mot de passe</label>
        <input class="input" [(ngModel)]="password" type="password" placeholder="admin123">
      </div>
    </div>
    <div style="margin-top:12px">
      <button class="btn" (click)="login()" [disabled]="!username || !password">Se connecter</button>
      <button class="btn" style="margin-left:6px;background:#8899aa" (click)="logout()">Se déconnecter</button>
    </div>
    <div *ngIf="error" class="alert">{{error}}</div>
  </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router){}

  login(){
    this.error='';
    try{
      this.auth.setCredentials(this.username, this.password);
      this.router.navigateByUrl('/');
    }catch(e){ this.error = 'Erreur de connexion'; }
  }

  logout(){
    this.auth.clear();
  }
}
