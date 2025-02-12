import { ValidatorFn } from '@angular/forms';
import { EsfsFormGroup } from '../_common';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { EsfsFormControlNumber } from '../number';
import { EsfsFormControlText } from '../text';

export type IEsfsFormControlAddressConfig = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlAddress>
>;

type IFormGroup = {
  street: EsfsFormControlText;
  number: EsfsFormControlText;
  city: EsfsFormControlText;
  zip: EsfsFormControlNumber;
  country: EsfsFormControlText;
};

export type IEsfsFormControlAddressValue = {
  street: string;
  number: string;
  city: string;
  zip: number;
  country: string;
};

export class EsfsFormControlAddress extends EsfsFormGroup<IFormGroup> {
  public fieldType: IEsfsFieldType = 'address';

  public street: EsfsFormControlText;
  public number: EsfsFormControlText;
  public city: EsfsFormControlText;
  public zip: EsfsFormControlNumber;
  public country: EsfsFormControlText;

  constructor(
    value: Partial<IEsfsFormControlAddressValue>,
    options: IEsfsFormControlAddressConfig
  ) {
    const street = new EsfsFormControlText(value.street ?? null);
    const number = new EsfsFormControlText(value.number ?? null);
    const city = new EsfsFormControlText(value.city ?? null);
    const zip = new EsfsFormControlNumber(value.zip ?? null);
    const country = new EsfsFormControlText(value.country ?? null);
    super(
      {
        street,
        number,
        city,
        zip,
        country,
      },
      {
        updateOn: options.updateOn,
        validators: options.validators,
        asyncValidators: options.asyncValidators,
      },
      options.keyPrefix,
      false
    );

    this.street = street;
    this.number = number;
    this.city = city;
    this.zip = zip;
    this.country = country;

    this.setupValidators();
  }

  protected buildValidatorsArray(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    /**
     * Signals can change and if we setup the validators according to the current config, it may not be valid later on
     *
     * So we set a validator for all cases anyways and inside it, we access the values of the signals.
     * So the values of the signals are checked every time a validator runs.
     */

    return validators;
  }

  public setupValidators(): void {
    this.setValidators(this.buildValidatorsArray());
  }
}
