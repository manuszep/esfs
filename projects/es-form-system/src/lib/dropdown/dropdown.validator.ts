import { AbstractControl } from '@angular/forms';
import { IEsfsValidationError } from '../_common';
import { IEsfsDropdownOption } from './dropdown.model';
import { Signal } from '@angular/core';

export const esfsValidateDropdown =
  (
    searchControl: AbstractControl,
    options: Signal<IEsfsDropdownOption<any>[]>,
    message?: string
  ) =>
  (control: AbstractControl): IEsfsValidationError => {
    const searchControlValue = searchControl.value;

    if (!searchControlValue) {
      return null;
    }

    const hasValue = control.value !== null && control.value !== undefined;
    const matchingOption = options().find(
      (option) => option.value === control.value
    );

    const valid =
      hasValue &&
      matchingOption !== undefined &&
      matchingOption.value === control.value;

    const error = message ?? 'validDropdown';

    return !valid ? { error, params: { value: searchControlValue } } : null;
  };
