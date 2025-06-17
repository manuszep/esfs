import { ValidatorFn } from '@angular/forms';
import { EsfsFormGroup } from '../_common';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { EsfsFormControlNumber } from '../number';
import { EsfsFormControlText } from '../text';
import { signal, WritableSignal } from '@angular/core';
import { EsfsFormControlDropdown } from '../dropdown';
import { esfsCountriesData } from '../_common/countries';

export type IEsfsFormControlAddressConfig = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlAddressBase>
>;

type IFormGroup = {
  street: EsfsFormControlText;
  number: EsfsFormControlText;
  city: EsfsFormControlText;
  zip: EsfsFormControlNumber;
  country: EsfsFormControlDropdown;
};

export type IEsfsFormControlAddressValue = {
  street: string;
  number: string;
  city: string;
  zip: number;
  country: string;
};

export abstract class EsfsFormControlAddressBase extends EsfsFormGroup<IFormGroup> {
  public fieldType: IEsfsFieldType = 'address';

  public street: EsfsFormControlText;
  public number: EsfsFormControlText;
  public city: EsfsFormControlText;
  public zip: EsfsFormControlNumber;
  public country: EsfsFormControlDropdown;

  public label: WritableSignal<string | boolean> = signal(true);

  constructor(
    value: Partial<IEsfsFormControlAddressValue>,
    options: IEsfsFormControlAddressConfig = {}
  ) {
    const street = new EsfsFormControlText(value.street ?? null, {
      label: false,
      required: false,
    });
    const number = new EsfsFormControlText(value.number ?? null, {
      label: false,
      required: false,
    });
    const city = new EsfsFormControlText(value.city ?? null, {
      label: false,
      required: false,
    });
    const zip = new EsfsFormControlNumber(value.zip ?? null, {
      label: false,
      required: false,
    });
    const country = new EsfsFormControlDropdown(value.country ?? null, {
      label: false,
      required: false,
      options: esfsCountriesData
        .filter((country) => country.code !== '---')
        .map((country) => ({
          label: `COUNTRY.${country.code}`,
          value: country.code,
        })),
    });
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
