import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator = (
  passwordKey = 'password',
  confirmPasswordKey = 'confirmPassword',
) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey);
    const confirmPassword = control.get(confirmPasswordKey);

    const throwError = () => {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    };

    if (!password || !confirmPassword) {
      return null;
    }

    if (!password.value || !confirmPassword.value) {
      return null;
    }

    return password.value === confirmPassword.value ? null : throwError();
  };
};
