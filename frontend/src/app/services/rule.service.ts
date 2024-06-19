import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rule } from '../models/rule.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private apiUrl = `${environment.apiUrl}/rules/`;

  constructor(private http: HttpClient) {}

  getRules(): Observable<Rule[]> {
    return this.http.get<Rule[]>(`${this.apiUrl}`);
  }

  createRule(rule: Rule): Observable<Rule> {
    return this.http.post<Rule>(`${this.apiUrl}create/`, rule);
  }

  updateRule(rule: Rule, id: number): Observable<Rule> {
    return this.http.put<Rule>(`${this.apiUrl}update/${id}/`, rule);
  }

  deleteRule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${id}/`);
  }

  updateRuleSequence(rules: Rule[]): Observable<Rule[]> {
    return this.http.put<Rule[]>(`${this.apiUrl}update-sequence/`, rules);
  }
}
