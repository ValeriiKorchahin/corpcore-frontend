import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ILogin } from '../../models/ILogin.interface';
import { RouterLink } from '@angular/router';
import { userStore } from '../../store/user/user-store';
import { Dispatcher } from '@ngrx/signals/events';
import { userEvents } from '../../store/user/user-store-events';

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
    MatCardTitle,
    MatError,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;
  public isPasswordVisible = false;
  public userStore = inject(userStore);
  readonly #dispatcher = inject(Dispatcher);

  ngOnInit() {
    this.createFormGroup();
  }

  login() {
    const credentials = this.form.value as ILogin;
    this.#dispatcher.dispatch(userEvents.login(credentials));
  }

  private createFormGroup() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
