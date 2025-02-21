import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { esfsDateConvertHtmlToJs, esfsDateIsValid } from './tools';

interface IEsfsValidationErrorData extends ValidationErrors {
  error: string;
  params: {
    value: any;
    [key: string]: any;
  };
}

export type IEsfsValidationError = IEsfsValidationErrorData | null;

const email =
  (message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.email(control);
    const error = message ?? 'email';

    return valid ? { error, params: { value: control.value } } : null;
  };

const max =
  (max: number, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.max(max)(control);
    const error = message ?? 'max';

    return valid ? { error, params: { value: control.value, max } } : null;
  };

const maxLength =
  (maxLength: number, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.maxLength(maxLength)(control);
    const error = message ?? 'maxLength';

    return valid
      ? { error, params: { value: control.value, maxLength } }
      : null;
  };

const min =
  (min: number, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.min(min)(control);
    const error = message ?? 'min';

    return valid ? { error, params: { value: control.value, min } } : null;
  };

const minLength =
  (minLength: number, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.minLength(minLength)(control);
    const error = message ?? 'minLength';

    return valid
      ? { error, params: { value: control.value, minLength } }
      : null;
  };

const pattern =
  (pattern: string | RegExp, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.pattern(pattern)(control);
    const error = message ?? 'pattern';

    return valid ? { error, params: { value: control.value, pattern } } : null;
  };

const required =
  (message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.required(control);
    const error = message ?? 'required';

    return valid ? { error, params: { value: control.value } } : null;
  };

const requiredTrue =
  (message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const valid = Validators.requiredTrue(control);
    const error = message ?? 'requiredTrue';

    return valid ? { error, params: { value: control.value } } : null;
  };

const date =
  (message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    if (!control.value) {
      return null;
    }

    const valid = esfsDateIsValid(control.value);
    const error = message ?? 'validDate';

    return !valid ? { error, params: { value: control.value } } : null;
  };

const minDate =
  (min: Date, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const date = esfsDateConvertHtmlToJs(control.value);

    if (!date) {
      return null;
    }

    const valid = date.getTime() >= min.getTime();
    const error = message ?? 'minDate';

    return !valid ? { error, params: { value: control.value } } : null;
  };

const maxDate =
  (max: Date, message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const date = esfsDateConvertHtmlToJs(control.value);

    if (!date) {
      return null;
    }

    const valid = date.getTime() <= max.getTime();
    const error = message ?? 'maxDate';

    return !valid ? { error, params: { value: control.value } } : null;
  };

const futureDate =
  (message?: string) =>
  (control: AbstractControl): IEsfsValidationError => {
    const date = esfsDateConvertHtmlToJs(control.value);

    if (!date) {
      return null;
    }

    const valid = date.getTime() > new Date().getTime();
    const error = message ?? 'futureDate';

    return !valid ? { error, params: { value: control.value } } : null;
  };

export const esfsValidators = {
  email,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  required,
  requiredTrue,
  date,
  minDate,
  maxDate,
  futureDate,
};
