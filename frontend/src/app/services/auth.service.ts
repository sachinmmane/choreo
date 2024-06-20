import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {
    this.getUserGroup();
    console.log(this.apiUrl);
  }
  onLogin(obj: any) {
    return this.http.post(`${this.apiUrl}/token`, obj);
  }

  getUserDetails() {
    return this.http.get(`${this.apiUrl}/user/me/`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserGroup(): string {
    const user = this.getUser();
    console.log('dsaf', user.groups[0]?.name);

    return user ? user.groups[0]?.name : null;
  }
}
