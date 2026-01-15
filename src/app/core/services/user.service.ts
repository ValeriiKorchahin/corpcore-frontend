import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { IAuthResponse, ILogin, IRegister } from '../models/ILogin.interface';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { IUser } from '../models/IUser.interface';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { IOrganization } from '../models/IOrganization.interface';
import { NotificationsService } from './notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user = signal<IUser | null>(null);
  private readonly apiService = inject(ApiService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly notificationsService = inject(NotificationsService);
  private readonly companiesService = inject(CompanyService);

  get user() {
    return this._user.asReadonly();
  }

  getCurrentUser(): Observable<IOrganization[]> {
    return this.apiService.get<IUser>('users/current').pipe(
      tap((user) => {
        this._user.set(user);
      }),
      switchMap(() => this.companiesService.getUserCompanies()),
    );
  }

  login(credentials: ILogin): Observable<IAuthResponse> {
    return this.apiService.post<ILogin, IAuthResponse>('auth/login', credentials).pipe(
      tap((res) => {
        this.populateUserAfterAuth(res);
        this.notificationsService.showMessage('Logged in successfully', 'success');
        this.jwtService.setToken(res.token);
        this.router.navigate(['/']);
      }),
      catchError((err: HttpErrorResponse) => {
        this.notificationsService.showMessage(err.error?.error, 'error');
        throw new Error(err.message);
      }),
    );
  }

  register(credentials: IRegister): Observable<IAuthResponse> {
    return this.apiService.post<IRegister, IAuthResponse>('auth/register', credentials).pipe(
      tap((res) => {
        this.populateUserAfterAuth(res);
        this.notificationsService.showMessage('Registered successfully', 'success');
        this.jwtService.setToken(res.token);
      }),
      catchError((err: HttpErrorResponse) => {
        this.notificationsService.showMessage(err.error?.error, 'error');
        throw new Error(err.message);
      }),
    );
  }

  logout(): void {
    this._user.set(null);
    this.jwtService.removeToken();
    this.router.navigate(['/login']);
  }

  private populateUserAfterAuth(res: IAuthResponse) {
    const user = {
      id: res.id,
      name: res.name,
      email: res.email,
      role: res.organizations[0].role,
    };
    this._user.set(user);
  }
}
