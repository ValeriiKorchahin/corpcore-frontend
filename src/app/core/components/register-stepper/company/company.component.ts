import { Component, OnInit, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneInput } from '../../../utils/controls/phone-input/phone-input';
import { COUNTRIES } from '../../../utils/const/countries';
import { MatSelect, MatOption } from '@angular/material/select';

export type CompanyFormType = FormGroup<{
  name: FormControl<string>;
  logoUrl: FormControl<string | null>;
  country: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  address: FormControl<string>;
}>;

@Component({
  selector: 'app-company',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    PhoneInput,
    MatSelect,
    MatOption,
    MatSelect,
    MatOption,
    MatSelect,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  public finishSignUp = output<boolean>();
  public form!: CompanyFormType;
  readonly countries = signal(COUNTRIES);

  ngOnInit(): void {
    this.createFormGroup();
  }

  submit(skipCompany: boolean) {
    this.finishSignUp.emit(skipCompany);
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
