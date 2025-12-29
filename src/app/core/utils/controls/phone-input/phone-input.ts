/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Self
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { Country } from './models/Country.interface';
import parsePhoneNumberFromString, { AsYouType, isValidPhoneNumber } from 'libphonenumber-js';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { COUNTRIES } from '../../const/countries';
import { Subject } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
@Component({
  selector: 'app-phone-input',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: PhoneInput
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSelect, MatSelectTrigger, MatInput, MatOption],
  template: `
    <div class="phone-root"
         (focusin)="onFocusIn()"
         (focusout)="onFocusOut()">

      <mat-select
        class="country-select"
        [disabled]="disabled"
        [value]="selectedCountry"
        (selectionChange)="selectCountry($event.value)">

        <mat-select-trigger>
          {{ selectedCountry.iso2 }}
          {{ selectedCountry.dialCode }}
        </mat-select-trigger>

        @for (country of countries; track country.iso2) {
          <mat-option [value]="country">
            {{ country.name }}
            <span class="dial">{{ country.dialCode }}</span>
          </mat-option>
        }
      </mat-select>

      <input
        matInput
        type="tel"
        class="phone-input"
        [disabled]="disabled"
        [value]="formatted"
        (input)="onInput($any($event.target).value)" />
    </div>
  `,
  styles: `
    .phone-root {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .country-select {
      width: 110px;
    }

    .phone-input {
      border: none;
      outline: none;
      flex: 1;
      background: transparent;
    }

    .dial {
      margin-left: auto;
      opacity: 0.6;
    }
  `,
})
export class PhoneInput  implements
  ControlValueAccessor,
  MatFormFieldControl<string>,
  OnDestroy {

  // ─────────────────────────────────────────────
  // Material Form Field plumbing
  // ─────────────────────────────────────────────

  static nextId = 0;
  @HostBinding() id = `app-phone-input-${PhoneInput.nextId++}`;

  readonly stateChanges = new Subject<void>();
  controlType = 'app-phone-input';

  focused = false;
  errorState = false;

  @Input() placeholder = '';
  @Input() required = false;
  @Input() disabled = false;

  // ─────────────────────────────────────────────
  // Data
  // ─────────────────────────────────────────────

  readonly countries = COUNTRIES;
  selectedCountry = this.countries[0];

  private phone = '';
  formatted = '';

  // ─────────────────────────────────────────────
  // CVA
  // ─────────────────────────────────────────────

  onChange = (_: string | null) => {};
  onTouched = () => {};

  constructor(
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.phone = '';
      this.formatted = '';
      this.stateChanges.next();
      return;
    }

    const parsed = parsePhoneNumberFromString(value);
    if (!parsed) return;

    const country = this.countries.find(
      c => c.iso2 === parsed.country
    );

    if (country) this.selectedCountry = country;

    this.phone = parsed.nationalNumber;
    this.formatted = parsed.formatNational();
    this.stateChanges.next();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }

  // ─────────────────────────────────────────────
  // Value & validation
  // ─────────────────────────────────────────────

  get value(): string | null {
    return this.phone
      ? `${this.selectedCountry.dialCode}${this.phone}`
      : null;
  }

  get empty() {
    return !this.phone;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private isValid(): boolean {
    return !this.value || isValidPhoneNumber(this.value);
  }

  private emit() {
    this.onChange(this.value);
    this.updateErrorState();
    this.stateChanges.next();
  }

  // ─────────────────────────────────────────────
  // Events
  // ─────────────────────────────────────────────

  onInput(value: string) {
    const typer = new AsYouType(this.selectedCountry.iso2);
    this.formatted = typer.input(value);
    this.phone = typer.getNationalNumber() ?? '';
    this.emit();
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.reformat();
  }

  private reformat() {
    if (!this.phone) return;

    const parsed = parsePhoneNumberFromString(
      this.phone,
      this.selectedCountry.iso2
    );

    this.formatted = parsed?.formatNational() ?? this.phone;
    this.emit();
  }

  // ─────────────────────────────────────────────
  // Focus & error handling
  // ─────────────────────────────────────────────

  onFocusIn() {
    this.focused = true;
    this.stateChanges.next();
  }

  onFocusOut() {
    this.focused = false;
    this.onTouched();
    this.updateErrorState();
    this.stateChanges.next();
  }

  updateErrorState() {
    const control = this.ngControl?.control;

    if (!control) return;

    const invalidPhone = this.required && !this.value || !this.isValid();

    this.errorState = !!(control && (control.touched || control.dirty) && invalidPhone);

    // 🔹 Sync errors to the FormControl
    if (invalidPhone) {
      control.setErrors({ invalidPhone: true });
    } else {
      // preserve other errors like 'required'
      if (control.hasError('invalidPhone')) {
        const errors = { ...control.errors };
        delete errors['invalidPhone'];
        control.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
  }

  onContainerClick() {
    this.elRef.nativeElement
      .querySelector('input')
      ?.focus();
  }

  setDescribedByIds(_: string[]) {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
