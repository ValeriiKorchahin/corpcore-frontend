import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICompany } from '../models/ICompany.interface';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from './notifications.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  private readonly apiService = inject(ApiService);
  private readonly notificationsService = inject(NotificationsService);

  create(company: ICompany): Observable<ICompany> {
   return this.apiService.post<ICompany, ICompany>('companies/', company).pipe(
     catchError((err: HttpErrorResponse) => {
       this.notificationsService.showMessage(err.error?.error, 'error');
       throw new Error(err.message);
     })
   );
  }
}
