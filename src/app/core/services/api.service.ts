import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.url;

  get<T>(url: string, options = {}): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + url, options);
  }

  post<B, R>(url: string, body: B, options = {}): Observable<R> {
    return this.httpClient.post<R>(this.apiUrl + url, body, options);
  }

  patch<B, R>(url: string, body: B, options = {}): Observable<R> {
    return this.httpClient.patch<R>(this.apiUrl + url, body, options);
  }

  put<B, R>(url: string, body: B, options = {}): Observable<R> {
    return this.httpClient.put<R>(this.apiUrl + url, body, options);
  }

  delete<T>(url: string, options = {}): Observable<T> {
    return this.httpClient.delete<T>(this.apiUrl + url, options);
  }
}
