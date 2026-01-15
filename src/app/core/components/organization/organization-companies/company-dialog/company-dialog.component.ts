import { Component, inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { ICompany } from '../../../../models/ICompany.interface';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { PhoneInput } from '../../../../utils/controls/phone-input/phone-input';
import { CompanyFormType } from '../../../register-stepper/company/company.component';
import { COUNTRIES } from '../../../../utils/const/countries';

@Component({
  selector: 'app-company-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    PhoneInput,
    ReactiveFormsModule
  ],
  templateUrl: './company-dialog.component.html',
  styleUrl: './company-dialog.component.scss',
})
export class CompanyDialogComponent implements OnInit {
  public data: ICompany = inject(MAT_DIALOG_DATA);
  public form!: CompanyFormType;
  readonly countries = signal(COUNTRIES);

  private readonly dialogRef = inject(MatDialogRef<CompanyDialogComponent>);

  ngOnInit() {
    this.createFormGroup();
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  public submit() {
    const value = this.form.getRawValue();
    this.dialogRef.close(value);
  }

  private createFormGroup() {
    this.form = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      logoUrl: new FormControl(''),
      country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      address: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }

}
