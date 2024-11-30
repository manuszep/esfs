import { signal, WritableSignal } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { esfsValidators, IEsfsValidationError } from '../_common/validators';

export type IAbeNgFieldTextConfigType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url';

export type IEsfsFormControlTextConfig<TValue = string> = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlText<TValue>>
>;

export class EsfsFormControlText<
  TValue = string
> extends EsfsFormControl<TValue> {
  public fieldType: IEsfsFieldType = 'text';

  pattern: WritableSignal<string> = signal('');
  minLength: WritableSignal<number | null> = signal(null);
  maxLength: WritableSignal<number | null> = signal(null);
  type: WritableSignal<IAbeNgFieldTextConfigType> = signal('text');
  clearable: WritableSignal<boolean> = signal(false);
  autocomplete: WritableSignal<boolean> = signal(false);
  textBefore: WritableSignal<boolean> = signal(false);
  textAfter: WritableSignal<boolean> = signal(false);
  iconBefore: WritableSignal<string | false> = signal(false);
  iconAfter: WritableSignal<string | false> = signal(false);

  constructor(value: TValue, config: IEsfsFormControlTextConfig<TValue>) {
    super(value, config);

    this.setupValidators();
    this.updateConfig(config);
  }

  protected override buildValidatorsArray(): ValidatorFn[] {
    const validators: ValidatorFn[] = super.buildValidatorsArray();

    /**
     * Signals can change and if we setup the validators according to the current config, it may not be valid later on
     *
     * So we set a validator for all cases anyways and inside it, we access the values of the signals.
     * So the values of the signals are checked every time a validator runs.
     */
    validators.push((control: AbstractControl): IEsfsValidationError => {
      const minLength = this.minLength();

      if (minLength === null || minLength === 0) {
        return null;
      }

      return esfsValidators.minLength(minLength)(control);
    });

    validators.push((control: AbstractControl): IEsfsValidationError => {
      const maxLength = this.maxLength();

      if (maxLength === null || maxLength === 0) {
        return null;
      }

      return esfsValidators.maxLength(maxLength)(control);
    });

    validators.push((control: AbstractControl): IEsfsValidationError => {
      const pattern = this.pattern();

      if (!pattern || pattern === '') {
        return null;
      }

      return esfsValidators.pattern(pattern)(control);
    });

    validators.push((control: AbstractControl): IEsfsValidationError => {
      const type = this.type();

      if (type === 'email') {
        return esfsValidators.email()(control);
      }

      if (type === 'password') {
        // eslint-disable-next-line no-useless-escape
        const error = esfsValidators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        )(control);

        if (error) {
          return {
            error: 'password',
            params: {
              value: control.value,
              minLength: 8,
              maxLength: 255,
            },
          };
        }

        const minLengthValidation = esfsValidators.minLength(8)(control);
        const maxLengthValidation = esfsValidators.maxLength(255)(control);

        return minLengthValidation ?? maxLengthValidation ?? null;
      }

      return null;
    });

    return validators;
  }
}
