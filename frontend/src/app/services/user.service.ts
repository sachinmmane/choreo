import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  onLogin(obj: any) {
    return this.http.post('http://127.0.0.1:8000/api/token', obj);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
