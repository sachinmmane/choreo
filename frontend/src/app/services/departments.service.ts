import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

interface Department {
  id: number;
  name: string;
  // Add other fields as necessary
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private apiUrl = `${environment.apiUrl}/departments/`;
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}${id}/`, department);
  }

  deleteDepartment(id: Department): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id.id}/`);
  }
}
