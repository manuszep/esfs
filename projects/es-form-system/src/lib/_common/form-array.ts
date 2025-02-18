import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormArray,
  ValidatorFn,
} from '@angular/forms';

import { EsfsFormGroup } from './form-group';

export class EsfsFormArray<
  TForm extends EsfsFormGroup = EsfsFormGroup
> extends FormArray<TForm> {
  constructor(
    controls: TForm[],
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}
