import { signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormControlState,
  ValidatorFn,
} from '@angular/forms';

import { IEsfsFieldType, IEsfsSignalConfigToSimpleConfig } from './types';
import { esfsValidators, IEsfsValidationError } from './validators';

export type IEsfsFormControlConfig<TValue> = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControl<TValue>>
>;

export class EsfsFormControl<TValue = any> extends FormControl<TValue | null> {
  public guid: string = crypto.randomUUID();

  public keyPrefix: WritableSignal<string> = signal('');
  public required: WritableSignal<boolean> = signal(true);
  public autofocus: WritableSignal<boolean> = signal(false);
  public tabIndex: WritableSignal<number> = signal(0);
  public label: WritableSignal<string | boolean> = signal(true);
  public placeholder: WritableSignal<string | boolean> = signal(true);
  public help: WritableSignal<string | boolean> = signal(false);

  public fieldType: IEsfsFieldType = 'none';

  protected originalValidators: ValidatorFn[] = [];
  protected originalAsyncValidators: AsyncValidatorFn[] = [];
  protected formToFieldMapper: (value: TValue) => any = (value: TValue) =>
    value;
  protected fieldToFormMapper: (value: any) => TValue = (value: any) => value;

  constructor(
    value: TValue | null,
    config: IEsfsFormControlConfig<TValue> = {}
  ) {
    super(
      {
        value,
        disabled: config.disabled ?? false,
      } as FormControlState<TValue | null>,
      {
        updateOn: config.updateOn ?? 'change',
        validators: config.validators ?? [],
        asyncValidators: config.asyncValidators ?? [],
      }
    );
  }

  protected getExcludedFieldsFromAutoMapper(): string[] {
    return [];
  }

  public updateConfig(config?: IEsfsFormControlConfig<TValue>): void {
    const configKeys = Object.keys(config ?? {}) as Array<keyof typeof config>;

    if (!config) {
      return;
    }

    for (const key of configKeys.filter(
      (value: string) =>
        ![
          'updateOn',
          'disabled',
          'validators',
          'asyncValidators',
          'formToFieldMapper',
          'fieldToFormMapper',
          ...this.getExcludedFieldsFromAutoMapper(),
        ].includes(value)
    )) {
      if (
        (typeof this[key] === 'undefined' ||
          typeof (this[key] as WritableSignal<unknown>)?.set !== 'function') &&
        this[key] !== null
      ) {
        throw new Error(
          `Property ${key as string} does not exist on ${this.constructor.name}`
        );
      }

      if (this[key] !== null) {
        (this[key] as WritableSignal<unknown>).set(config[key]);
      }
    }

    this.originalValidators = config.validators ?? [];
    this.originalAsyncValidators = config.asyncValidators ?? [];
    this.formToFieldMapper = config.formToFieldMapper ?? this.formToFieldMapper;
    this.fieldToFormMapper = config.fieldToFormMapper ?? this.fieldToFormMapper;
  }

  public resetValidators(): void {
    this.setValidators(this.originalValidators);
    this.setAsyncValidators(this.originalAsyncValidators);
  }

  protected buildValidatorsArray(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

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

      return esfsValidators.required()(control);
    });

    return validators;
  }

  public setupValidators(): void {
    this.setValidators(this.buildValidatorsArray());
  }
}

/*

export abstract class EsfsFormControlWithDecorators<
  TValue,
  TConfig extends IESFSFieldConfigWithDecorators
> extends EsfsFormControl<TValue, TConfig> {
  public iconBefore = '';
  public iconAfter = '';
  public textBefore = false;
  public textAfter = false;

  public override updateConfig(config: TConfig): void {
    super.updateConfig(config);

    this.iconBefore = config.iconBefore ?? this.iconBefore;
    this.iconAfter = config.iconAfter ?? this.iconAfter;
    this.textBefore = config.textBefore ?? this.textBefore;
    this.textAfter = config.textAfter ?? this.textAfter;
  }
}
*/
