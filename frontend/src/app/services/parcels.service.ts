import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParcelsService {
  constructor(private http: HttpClient) {}

  onFileUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`http://127.0.0.1:8000/api/upload`, formData);
  }

  checkContainerIdExists(containerId: any): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:8000/api/check-container/${containerId}`
    );
  }
}
