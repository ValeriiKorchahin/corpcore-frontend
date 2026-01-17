import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { ICompany } from '../models/ICompany.interface';
import { catchError, Observable, tap } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NotificationsService } from './notifications.service';
import { IPaginatedResponse, IPagination } from '../models/IPagination.interface';
import { IOrganization } from '../models/IOrganization.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly apiService = inject(ApiService);
  private readonly notificationsService = inject(NotificationsService);

  private readonly _userCompanies = signal<IOrganization[]>([]);

  get userCompanies() {
    return this._userCompanies.asReadonly();
  }

  getOrganizationCompanies(pagination: IPagination, search?: string) {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.apiService
      .post<IPagination, IPaginatedResponse<ICompany[]>>('companies/list', pagination, {
        params: params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationsService.showMessage(error.error?.error, 'error');
          throw new Error(error.message);
        }),
      );
  }

  getUserCompanies(): Observable<IOrganization[]> {
    return this.apiService.get<IOrganization[]>('companies/user').pipe(
      tap((companies) => {
        this._userCompanies.set(companies);
      }),
    );
  }

  create(company: ICompany): Observable<ICompany> {
    return this.apiService.post<ICompany, ICompany>('companies/', company).pipe(
      catchError((err: HttpErrorResponse) => {
        this.notificationsService.showMessage(err.error?.error, 'error');
        throw new Error(err.message);
      })
    );
  }

  edit(id: string, company: ICompany): Observable<ICompany> {
    return this.apiService.put<ICompany, ICompany>(`companies/${id}`, company);
  }
}
