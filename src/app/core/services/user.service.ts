import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { IAuthResponse, ILogin, IRegister } from '../models/ILogin.interface';
import { catchError, Observable, tap } from 'rxjs';
import { IUser } from '../models/IUser.interface';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { userCompaniesStore } from '../store/user-companies/user-companies-store';
import { Dispatcher } from '@ngrx/signals/events';
import { userCompaniesEvents } from '../store/user-companies/user-companies-events';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user = signal<IUser | null>(null);
  private readonly apiService = inject(ApiService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly notificationsService = inject(NotificationsService);
  private readonly userCompaniesStore = inject(userCompaniesStore);
  private readonly dispatcher = inject(Dispatcher);

  get user() {
    return this._user.asReadonly();
  }

  getCurrentUser(): Observable<IUser> {
    return this.apiService.get<IUser>('users/current').pipe(
      tap((user) => {
        this.dispatcher.dispatch(userCompaniesEvents.load());
        this._user.set(user);
      }),
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
        this.router.navigate(['/']);
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
