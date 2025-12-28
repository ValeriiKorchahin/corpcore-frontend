import { Component, OnInit, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export type CompanyFormType = FormGroup<{
  name: FormControl<string | null>;
  logoUrl: FormControl<string | null>;
  country: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  address: FormControl<string | null>;
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
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  public finishSignUp = output<boolean>();
  public form!: CompanyFormType;

  ngOnInit(): void {
    this.createFormGroup();
  }

  submit(skipCompany: boolean) {
    this.finishSignUp.emit(skipCompany);
  }

  private createFormGroup() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      logoUrl: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
}
