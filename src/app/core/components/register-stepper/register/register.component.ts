import { Component, OnInit, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { passwordMatchValidator } from '../../../utils/validators/password-match.validator';
import { RouterLink } from '@angular/router';

export type RegisterFormType = FormGroup<{
  email: FormControl<string>;
  name: FormControl<string>;
  organizationName: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}>;

@Component({
  selector: 'app-register',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatTooltip,
    MatError,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public nextStep = output<number>();

  public form!: RegisterFormType;
  public isPasswordVisible = false;
  public isPasswordMatchVisible = false;

  ngOnInit() {
    this.createFormGroup();
  }

  submit() {
    this.nextStep.emit(0);
  }

  private createFormGroup() {
    this.form = new FormGroup(
      {
        email: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        }),
        organizationName: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: passwordMatchValidator(),
      },
    );
  }
}
