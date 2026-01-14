import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormField, MatInput, MatPrefix } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OrgCompaniesStore } from './organization-companies-store';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ICompany } from '../../../models/ICompany.interface';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';

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
    MatPaginator,
    MatProgressBar,
    MatButton,
    MatMenuContent,
  ],
  templateUrl: './organization-companies.component.html',
  styleUrl: './organization-companies.component.scss',
})
export class OrganizationCompaniesComponent implements OnInit {
  public displayedColumns = signal(['name', 'email', 'phone', 'country', 'actions']);
  protected readonly orgCompaniesStore = inject(OrgCompaniesStore);
  private readonly dialog = inject(MatDialog);

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

  openCompany(company?: ICompany) {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      data: company
    });

    dialogRef.afterClosed().subscribe((result: ICompany) => {
      if (result) {
        return company?.id ?
          this.orgCompaniesStore.editCompany({company: result, id: company.id}) :
          this.orgCompaniesStore.addCompany(result);
      }
      return null;
    });
  }
}
