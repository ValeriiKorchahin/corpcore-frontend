import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICompany } from '../models/ICompany.interface';
import { IUser } from '../models/IUser.interface';
import { IPaginatedResponse, IPagination } from '../models/IPagination.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  private readonly apiService = inject(ApiService);

  getOrganizationCompanies(pagination: IPagination, search?: string) {
    const params = new HttpParams();
    if (search) {
      params.set('search', search);
    }
    return this.apiService.post<IPagination, IPaginatedResponse<ICompany>>('companies/list', pagination, {
      params: params
    });
  }

  getOrganizationUsers(pagination: IPagination, search?: string) {
    const params = new HttpParams();
    if (search) {
      params.set('search', search);
    }
    return this.apiService.post<IPagination, IPaginatedResponse<IUser>>('users/list', pagination, {
      params: params
    });
  }

}
