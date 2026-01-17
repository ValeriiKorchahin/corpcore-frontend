import { Component, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { userCompaniesStore } from '../../store/user-companies/user-companies-store';

@Component({
  selector: 'app-header',
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatFormField,
    MatSelect,
    MatOption,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly userService = inject(UserService);
  public currentUser = computed(() => this.userService.user());
  public readonly userCompaniesStore = inject(userCompaniesStore);

  private readonly router = inject(Router);

  viewOrganization() {
    this.router.navigate(['/organization']);
  }

  logout() {
    this.userService.logout();
  }
}
