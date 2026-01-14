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
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { OrgCompaniesStore } from '../organization-companies/organization-companies-store';

@Component({
  selector: 'app-organization-companies-ngrx',
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
    MatHeaderCellDef
  ],
  templateUrl: './organization-companies-ngrx.html',
  styleUrl: './organization-companies-ngrx.scss',
})
export class OrganizationCompaniesNgrx implements OnInit {
  public displayedColumns = signal(['name', 'email', 'phone', 'country', 'actions']);
  protected readonly orgCompaniesStore = inject(OrgCompaniesStore);

  ngOnInit(): void {
    this.orgCompaniesStore.load();
  }

  setFilter(e: Event) {
    const filter = (e.target as HTMLInputElement).value;
    console.log(filter);
    this.orgCompaniesStore.filter(filter);
  }

  setPagination(e: PageEvent) {
    const pagination = {
      page: e.pageIndex + 1,
      limit: e.pageSize,
    };
    this.orgCompaniesStore.changePage(pagination);
  }
}
