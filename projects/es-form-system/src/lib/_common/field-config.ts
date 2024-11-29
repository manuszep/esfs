import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export interface IESFSFieldConfig {
  keyPrefix?: string;
  label?: boolean;
  assistiveText?: boolean;
  required?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  tabIndex?: number;
  updateOn?: 'blur' | 'change' | 'submit';
  validation?: ValidatorFn[];
  asyncValidation?: AsyncValidatorFn[];
  formToFieldMapper?: (value: any) => any;
  fieldToFormMapper?: (value: any) => any;
}

export interface IESFSFieldConfigWithDecorators extends IESFSFieldConfig {
  iconBefore?: string;
  iconAfter?: string;
  textBefore?: boolean;
  textAfter?: boolean;
}
