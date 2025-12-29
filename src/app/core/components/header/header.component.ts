import { Component, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [MatIconButton, MatIcon, MatTooltip, MatFormField, MatSelect, MatOption],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly userService = inject(UserService);
  public currentUser = computed(() => this.userService.user());
  public companies = computed(() => this.userService.userCompanies());
}
