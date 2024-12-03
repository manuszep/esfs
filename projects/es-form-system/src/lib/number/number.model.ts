import { signal, WritableSignal } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { esfsValidators, IEsfsValidationError } from '../_common/validators';

export type IEsfsFormControlNumberConfig = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlNumber>
>;

export class EsfsFormControlNumber extends EsfsFormControl<number | null> {
  public fieldType: IEsfsFieldType = 'number';

  min: WritableSignal<number | null> = signal<number | null>(null);
  max: WritableSignal<number | null> = signal<number | null>(null);
  clearable: WritableSignal<boolean> = signal(false);
  autocomplete: WritableSignal<boolean> = signal(false);
  textBefore: WritableSignal<boolean> = signal(false);
  textAfter: WritableSignal<boolean> = signal(false);
  iconBefore: WritableSignal<string | false> = signal(false);
  iconAfter: WritableSignal<string | false> = signal(false);

  constructor(value: number | null, config?: IEsfsFormControlNumberConfig) {
    super(value, config ?? {});

    this.setupValidators();
    this.updateConfig(config);
  }

  protected override buildValidatorsArray(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    /**
     * Signals can change and if we setup the validators according to the current config, it may not be valid later on
     *
     * So we set a validator for all cases anyways and inside it, we access the values of the signals.
     * So the values of the signals are checked every time a validator runs.
     */
    validators.push((control: AbstractControl): IEsfsValidationError => {
      const min = this.min();

      if (min === null) {
        return null;
      }

      return esfsValidators.min(min)(control);
    });

    validators.push((control: AbstractControl): IEsfsValidationError => {
      const max = this.max();

      if (max === null) {
        return null;
      }

      return esfsValidators.min(max)(control);
    });

    return validators;
  }
}
