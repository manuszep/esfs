import { AbstractControlOptions, FormGroup } from '@angular/forms';
import { EsfsFormControl } from './form-control';
import { signal } from '@angular/core';

export class EsfsFormGroup<
  TValue extends Record<string, any> = any,
  TForm extends Record<string, EsfsFormControl | EsfsFormGroup> = Record<
    string,
    EsfsFormControl
  >
> extends FormGroup {
  public keyPrefix = signal('');
  public persistToSessionStorage: string | false;

  constructor(
    formConfig: TForm,
    options: AbstractControlOptions = { updateOn: 'blur' },
    keyPrefix = '',
    persistToSessionStorage: string | false = false
  ) {
    super(formConfig, options);

    this.updateControlsKeyPrefix(keyPrefix);

    this.persistToSessionStorage = persistToSessionStorage;
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
