import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UserService } from '../../services/user.service';
import { ILogin } from '../../models/ILogin.interface';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatCardActions,
    MatButton,
    MatIconButton,
    MatSuffix,
    MatIcon,
    MatTooltip,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  public form!: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string | null>
  }>;
  public isPasswordVisible = false;

  private readonly userService = inject(UserService);

  ngOnInit() {
    this.createFormGroup();
  }

  login() {
    const credentials = this.form.value as ILogin;
    this.userService.login(credentials).subscribe();
  }

  private createFormGroup() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
}
