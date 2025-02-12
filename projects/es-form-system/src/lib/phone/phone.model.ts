import { signal, WritableSignal } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { EsfsFormControlDropdown } from '../dropdown';
import { EsfsFormControlText } from '../text';

export type IEsfsFormControlPhoneConfig = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlPhone>
>;

export class EsfsFormControlPhone extends EsfsFormControl<string | null> {
  public fieldType: IEsfsFieldType = 'phone';

  public clearable: WritableSignal<boolean> = signal(false);
  public textBefore: WritableSignal<boolean> = signal(false);
  public textAfter: WritableSignal<boolean> = signal(false);
  public iconBefore: WritableSignal<string | false> = signal(false);
  public iconAfter: WritableSignal<string | false> = signal(false);

  constructor(value: string | null, config?: IEsfsFormControlPhoneConfig) {
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
    return validators;
  }
}
