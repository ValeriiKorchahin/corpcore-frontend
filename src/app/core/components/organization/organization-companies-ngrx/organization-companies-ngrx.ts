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
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { OrgCompaniesStore } from '../organization-companies/organization-companies-store';
import { OrgCompaniesEventStore } from './org-companies-event-store';
import { Dispatcher } from '@ngrx/signals/events';
import { orgCompaniesEvents } from './org-companies-events';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ICompany } from '../../../models/ICompany.interface';
import { CompanyDialogComponent } from '../organization-companies/company-dialog/company-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    MatHeaderCellDef,
    MatMenuTrigger,
    MatProgressBar,
    MatMenuContent,
    MatButton
  ],
  templateUrl: './organization-companies-ngrx.html',
  styleUrl: './organization-companies-ngrx.scss',
})
export class OrganizationCompaniesNgrx implements OnInit {
  public displayedColumns = signal(['name', 'email', 'phone', 'country', 'actions']);
  public readonly store = inject(OrgCompaniesEventStore);
  readonly #dispatcher = inject(Dispatcher);
  readonly #dialog = inject(MatDialog);

  ngOnInit(): void {
    this.#dispatcher.dispatch(orgCompaniesEvents.load());
  }

  setFilter(e: Event) {
    const filter = (e.target as HTMLInputElement).value;
    this.#dispatcher.dispatch(orgCompaniesEvents.filter(filter));

  }

  setPagination(e: PageEvent) {
    const pagination = {
      page: e.pageIndex + 1,
      limit: e.pageSize,
    };
    this.#dispatcher.dispatch(orgCompaniesEvents.pageChange(pagination));
  }

  openCompany(company?: ICompany) {
    const dialogRef = this.#dialog.open(CompanyDialogComponent, {
      data: company
    });

    dialogRef.afterClosed().subscribe((result: ICompany) => {
      if (result) {
        return company?.id ?
          this.#dispatcher.dispatch(orgCompaniesEvents.editCompany({ companyId: company.id, company: result })) :
          this.#dispatcher.dispatch(orgCompaniesEvents.addCompany(result));
      }
      return null;
    });
  }
}
