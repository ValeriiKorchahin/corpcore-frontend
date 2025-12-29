import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = 'blue-porcelain'; //default theme

  setTheme(theme: string) {
    this.theme = theme;
    document.body.setAttribute('data-theme', theme);
  }
}
