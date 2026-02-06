import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', this.theme() === 'dark');
  }

  setTheme(newTheme: 'light' | 'dark') {
    this.theme.set(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  }
}
