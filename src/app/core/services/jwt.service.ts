import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly _key = 'token';

  get token(): string | null {
    return localStorage.getItem(this._key);
  }

  setToken(token: string): void {
    return localStorage.setItem(this._key, token);
  }

  removeToken(): void {
    return localStorage.removeItem(this._key);
  }
}
