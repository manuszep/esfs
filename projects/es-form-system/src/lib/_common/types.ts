import { WritableSignal } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export type IEsfsGetSignalType<S> = S extends WritableSignal<infer T>
  ? T
  : never;

export type IEsfsSignalConfigToSimpleConfig<TType, TValue = any> = {
  disabled: boolean;
  updateOn?: IEsfsFieldUpdateStrategy;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  formToFieldMapper?: (value: TValue) => any;
  fieldToFormMapper?: (value: any) => TValue;
} & {
  [Key in keyof TType as TType[Key] extends WritableSignal<unknown>
    ? Key
    : never]: IEsfsGetSignalType<TType[Key]>;
};

export type IEsfsFieldType =
  | 'checkbox'
  | 'image'
  | 'number'
  | 'orientation'
  | 'dropdown'
  | 'text'
  | 'date'
  | 'phone'
  | 'address';
export type IEsfsFieldUpdateStrategy = 'change' | 'blur' | 'submit';
