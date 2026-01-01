import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormField, MatInput, MatPrefix } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { ICompany } from '../../../models/ICompany.interface';
import { OrganizationService } from '../../../services/organization.service';
import { IPagination } from '../../../models/IPagination.interface';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-organization-companies',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatIcon,
    MatInput,
    MatPrefix,
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTooltip,
    MatPaginator
  ],
  templateUrl: './organization-companies.component.html',
  styleUrl: './organization-companies.component.scss',
})
export class OrganizationCompaniesComponent implements OnInit {

  public search = new FormControl('');
  public companies = signal<ICompany[]>([]);
  public pagination = signal<IPagination>({
    page: 1,
    limit: 20
  });
  public displayedColumns = signal(['name', 'email', 'phone', 'country', 'actions']);
  private readonly organizationService = inject(OrganizationService);

  ngOnInit(): void {
    this.getCompanies();
  }

  changePage(e: PageEvent) {
    this.pagination.set({
      limit: e.pageSize,
      page: e.pageIndex + 1
    });
    this.getCompanies();
  }

  private getCompanies(search?: string) {
    this.organizationService.getOrganizationCompanies(this.pagination(), search).subscribe((res) => {
      this.companies.set(res.data);
    });
  }
}
