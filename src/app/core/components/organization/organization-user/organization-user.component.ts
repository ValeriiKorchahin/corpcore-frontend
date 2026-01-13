import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatFormField, MatInput, MatPrefix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { OrgUserStore } from './organization-user-store';
import { IPagination } from '../../../models/IPagination.interface';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { OrganizationRoleEnum } from '../../../utils/enums/OrganizationRole.enum';
import { IUser } from '../../../models/IUser.interface';

@Component({
  selector: 'app-organization-user',
  imports: [
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    MatPrefix,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    MatHeaderCellDef,
    MatMenuTrigger,
    MatSelect,
    MatOption,
  ],
  templateUrl: './organization-user.component.html',
  styleUrl: './organization-user.component.scss',
})
export class OrganizationUserComponent implements OnInit {
  public displayedColumns = signal(['name', 'email', 'role', 'actions']);
  readonly orgUserStore = inject(OrgUserStore);

  ngOnInit(): void {
    this.orgUserStore.load();
  }

  setFilter(e: Event) {
    const filter = (e.target as HTMLInputElement).value;
    this.orgUserStore.filter(filter);
  }

  setPagination(e: PageEvent) {
    const pagination: IPagination = {
      page: e.pageIndex + 1,
      limit: e.pageSize,
    };
    this.orgUserStore.changePage(pagination);
  }

  changeUserRole(e: MatSelectChange<number>, user: IUser) {
    console.log(e);
    console.log(user);
  }

  protected readonly OrganizationRoleEnum = OrganizationRoleEnum;
}
