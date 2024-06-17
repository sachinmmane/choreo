import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ParcelsService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getParcels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/parcels/`);
  }

  getStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/status`);
  }

  updateParcelStatus(parcelId: number, statusId: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/parcels/update-status/${parcelId}`,
      { status_id: statusId }
    );
  }

  onFileUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  checkContainerIdExists(containerId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-container/${containerId}`);
  }

  getParcelById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/parcels/${id}/`);
  }
}
