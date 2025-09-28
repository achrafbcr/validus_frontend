import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
  <div class="container">
    <div class="header">
      <h1>VALIDUS – Gestion des Factures</h1>
      <nav>
        <a routerLink="/" class="btn" style="margin-right:8px">Liste</a>
        <a routerLink="/new" class="btn" style="margin-right:8px">Nouvelle facture</a>
        <a routerLink="/login" class="btn">Login</a>
      </nav>
    </div>
    <router-outlet></router-outlet>
    <footer class="small">Backend attendu sur <code>http://localhost:8080</code> — Proxy <code>/api</code></footer>
  </div>
  `
})
export class AppComponent {}
