import { Component, inject, Signal, signal, viewChild } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';
import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemMeta,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { NgClass } from '@angular/common';
import { IRegister } from '../../models/ILogin.interface';
import { NotificationsService } from '../../services/notifications.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-register-stepper',
  imports: [
    MatIcon,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListItemMeta,
    NgClass,
    RegisterComponent,
    CompanyComponent,
  ],
  templateUrl: './register-stepper.component.html',
  styleUrl: './register-stepper.component.scss',
})
export class RegisterStepperComponent {
  public registerComponent: Signal<RegisterComponent | undefined> =
    viewChild.required('registerComponent');
  public companyComponent: Signal<CompanyComponent | undefined> =
    viewChild.required('companyComponent');
  public steps = signal([
    {
      submitted: false,
      icon: 'person',
      name: 'Register',
    },
    {
      submitted: false,
      icon: 'add_business',
      name: 'Create company',
    },
  ]);

  public selectedIndex = signal(0);

  private readonly userService = inject(UserService);
  private readonly companyService = inject(CompanyService);
  private readonly notificationsService = inject(NotificationsService);
  private readonly router = inject(Router);

  finishRegister(skipCompany: boolean) {
    this.checkFormValidity();
    const registerFormValue = this.registerComponent()?.form.getRawValue();
    const companyFormValue = this.companyComponent()?.form.getRawValue();
    const company = skipCompany
      ? null
      : {
          email: companyFormValue!.email,
          name: companyFormValue!.name,
          logoUrl: companyFormValue!.logoUrl,
          address: companyFormValue!.address,
          phone: companyFormValue!.phone,
          country: companyFormValue!.country,
        };
    const register: IRegister = {
      name: registerFormValue!.name,
      password: registerFormValue!.password,
      email: registerFormValue!.email,
      organizationName: registerFormValue!.organizationName,
    };

    return this.userService
      .register(register)
      .pipe(
        switchMap(() => (company ? this.companyService.create(company) : of(null))),
        switchMap(() => this.userService.getUserCompanies()),
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  selectTab(i: number) {
    this.selectedIndex.set(i);
  }

  nextStep(stepIndex: number) {
    this.steps.update((value) => {
      if (!value[stepIndex].submitted) {
        value[stepIndex].submitted = true;
      }
      return [...value];
    });
    this.selectedIndex.update((v) => v + 1);
  }

  private checkFormValidity() {
    const isRegisterValid = this.registerComponent()?.form.valid;
    if (!isRegisterValid) {
      this.selectedIndex.set(0);
      this.registerComponent()?.form.markAllAsTouched();
      return this.notificationsService.showMessage('Please, fill in the register form', 'error');
    }
  }
}
