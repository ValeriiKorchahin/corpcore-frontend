import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { IOrganization } from '../../models/IOrganization.interface';
import { IUser } from '../../models/IUser.interface';

@Component({
  selector: 'app-header',
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatFormField,
    MatSelect,
    MatOption,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public companies = signal<IOrganization[]>([]);
  public user = signal<IUser | null>(null);

  ngOnInit() {


  }
}
