import { AbstractControlOptions, FormGroup } from '@angular/forms';
import { EsfsFormControl } from './form-control';
import { signal } from '@angular/core';
import { EsfsFormArray } from './form-array';

export type IEsfsFormGroupConfig = Record<
  string,
  EsfsFormControl | EsfsFormGroup | EsfsFormArray<any>
>;

export type IEsfsFormGroupOptions = AbstractControlOptions;

type PartialDeep<T> = T extends (...args: any[]) => any
  ? T
  : T extends Date
  ? T
  : T extends Array<infer InferredArrayMember>
  ? Array<PartialDeep<InferredArrayMember>>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;

type DeepPartialObject<T> = {
  [Key in keyof T]?: PartialDeep<T[Key]>;
};

export class EsfsFormGroup<
  TValue extends Record<string, any> = any,
  TForm extends IEsfsFormGroupConfig = IEsfsFormGroupConfig
> extends FormGroup {
  public keyPrefix = signal('');
  public persistToSessionStorage: string | false;

  constructor(
    formConfig: TForm,
    options: IEsfsFormGroupOptions = { updateOn: 'blur' },
    keyPrefix = '',
    persistToSessionStorage: string | false = false,
    data?: PartialDeep<TValue>
  ) {
    super(formConfig, options);

    this.updateControlsKeyPrefix(keyPrefix);

    this.persistToSessionStorage = persistToSessionStorage;

    if (data) {
      this.patchValue(data);
    }
  }

  private updateControlsKeyPrefix(keyPrefix: string): void {
    this.keyPrefix.set(keyPrefix);

    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];

      if (control instanceof EsfsFormControl) {
        control.keyPrefix.set(keyPrefix);
      } else if (control instanceof EsfsFormGroup) {
        control.updateControlsKeyPrefix(keyPrefix);
      }
    });
  }
}
