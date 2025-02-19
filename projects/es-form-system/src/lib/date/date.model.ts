import { signal, WritableSignal } from '@angular/core';
import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { esfsValidators, IEsfsValidationError } from '../_common/validators';

export type IEsfsFormControlDateConfig = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlDateBase>
>;

export abstract class EsfsFormControlDateBase extends EsfsFormControl<string> {
  public override fieldType: IEsfsFieldType = 'date';

  min: WritableSignal<Date | null> = signal<Date | null>(null);
  max: WritableSignal<Date | null> = signal<Date | null>(null);
  future: WritableSignal<boolean> = signal<boolean>(false);
  textBefore: WritableSignal<boolean> = signal(false);
  textAfter: WritableSignal<boolean> = signal(false);
  iconBefore: WritableSignal<string | false> = signal(false);
  iconAfter: WritableSignal<string | false> = signal(false);

  constructor(value: string, config?: IEsfsFormControlDateConfig) {
    super(value, config ?? {});

    this.setupValidators();
    this.updateConfig(config);
  }

  protected override buildValidatorsArray(): ValidatorFn[] {
    const validators: ValidatorFn[] = [esfsValidators.date()];

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

      return esfsValidators.minDate(min)(control);
    });

    validators.push((control: AbstractControl): IEsfsValidationError => {
      const max = this.max();

      if (max === null) {
        return null;
      }

      return esfsValidators.maxDate(max)(control);
    });

    validators.push((control: AbstractControl): IEsfsValidationError => {
      const futureDate = this.future();

      if (!futureDate) {
        return null;
      }

      return esfsValidators.futureDate()(control);
    });

    return validators;
  }
}
