import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-organization',
  imports: [
    MatButton,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatCard,
    MatIcon
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent {

  public readonly navigation = signal([
    {
      title: 'Companies',
      icon: 'source_environment',
      link: '/companies'
    },
    {
     title: 'Users',
      icon: 'supervisor_account',
     link: '/users'
    },
  ]);
  private readonly router = inject(Router);

  navigate(link: string): void {
    this.router.navigate(['organization' + link]);
  }
}
