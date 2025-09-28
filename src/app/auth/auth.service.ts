import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // store base64 creds in sessionStorage for demo only
  private key = 'validus_basic';
  basic = signal<string | null>(sessionStorage.getItem(this.key));

  setCredentials(username: string, password: string) {
    const token = btoa(username + ':' + password);
    sessionStorage.setItem(this.key, token);
    this.basic.set(token);
  }

  clear(){
    sessionStorage.removeItem(this.key);
    this.basic.set(null);
  }

  header(): { Authorization: string } | {} {
    const b = this.basic();
    return b ? { Authorization: 'Basic ' + b } : {};
  }
}
