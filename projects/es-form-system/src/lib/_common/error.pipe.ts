import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidationErrors } from '@angular/forms';

import { IEsfsValidationError } from './validators';

@Pipe({
  name: 'esfsFormError',
})
export class EsfsFormErrorPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform(
    value: IEsfsValidationError | ValidationErrors | undefined,
    prefix?: string
  ): string {
    if (!value) {
      return '';
    }

    const prefixedKey = `${prefix}.${value.error}`.toUpperCase();

    const prefixedTranslation = prefix
      ? this.translateService.instant(prefixedKey, value.params)
      : undefined;

    if (!prefixedTranslation) {
      return this.translateService.instant(
        value.error.toUpperCase(),
        value.params
      );
    }

    return prefixedTranslation;
  }
}
