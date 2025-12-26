import { Component, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IRegister } from '../../models/ILogin.interface';
import { MatTooltip } from '@angular/material/tooltip';
import { passwordMatchValidator } from '../../utils/validators/password-match.validator';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup<{
    email: FormControl<string | null>,
    name: FormControl<string | null>,
    organizationName: FormControl<string | null>,
    password: FormControl<string | null>,
    confirmPassword: FormControl<string | null>,
  }>;
  public isPasswordVisible = false;
  public isPasswordMatchVisible = false;

  private readonly userService = inject(UserService);

  ngOnInit() {
    this.createFormGroup();
  }

  signUp() {
    const credentials = this.form.value as IRegister;
    console.log(credentials);
    // this.userService.register(credentials).subscribe();
  }

  private createFormGroup() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      organizationName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, {
      validators: passwordMatchValidator()
    });
  }
}
