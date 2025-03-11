import { signal, WritableSignal } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { esfsValidators, IEsfsValidationError } from '../_common/validators';

export type IEsfsFormControlCheckboxConfig = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlCheckboxBase>
>;

export abstract class EsfsFormControlCheckboxBase extends EsfsFormControl<boolean> {
  public override fieldType: IEsfsFieldType = 'checkbox';

  style: WritableSignal<'classic' | 'toggle'> = signal<'classic' | 'toggle'>(
    'toggle'
  );

  constructor(value: boolean, config?: IEsfsFormControlCheckboxConfig) {
    super(value, config ?? {});

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
      const required = this.required();

      if (!required) {
        return null;
      }

      return esfsValidators.requiredTrue()(control);
    });

    return validators;
  }
}
