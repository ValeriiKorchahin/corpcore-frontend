import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICompany } from '../models/ICompany.interface';
import { IUser } from '../models/IUser.interface';
import { IPaginatedResponse, IPagination } from '../models/IPagination.interface';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  private readonly apiService = inject(ApiService);
  private readonly notificationsService = inject(NotificationsService);

  getOrganizationCompanies(pagination: IPagination, search?: string) {
    const params = new HttpParams();
    if (search) {
      params.set('search', search);
    }
    return this.apiService.post<IPagination, IPaginatedResponse<ICompany[]>>('companies/list', pagination, {
      params: params
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationsService.showMessage(error.error?.error, 'error');
        throw new Error(error.message);
      })
    );
  }

  getOrganizationUsers(pagination: IPagination, search?: string) {
    const params = new HttpParams();
    if (search) {
      params.set('search', search);
    }
    return this.apiService.post<IPagination, IPaginatedResponse<IUser[]>>('users/list', pagination, {
      params: params
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationsService.showMessage(error.error?.error, 'error');
        throw new Error(error.message);
      })
    );
  }

}
