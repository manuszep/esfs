import { signal, WritableSignal } from '@angular/core';

import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { Observable, of } from 'rxjs';

export type IEsfsFormControlDropdownConfig<TValue = null> = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlDropdown<TValue>>
> & {
  options?:
    | Observable<IEsfsDropdownOption<TValue>[]>
    | IEsfsDropdownOption<TValue>[];
};

export interface IEsfsDropdownOption<TValue = null> {
  label: string;
  value: TValue;
}

export class EsfsFormControlDropdown<
  TValue = string | null
> extends EsfsFormControl<TValue> {
  public override fieldType: IEsfsFieldType = 'dropdown';

  clearable: WritableSignal<boolean> = signal(false);
  textBefore: WritableSignal<boolean> = signal(false);
  textAfter: WritableSignal<boolean> = signal(false);
  iconBefore: WritableSignal<string | false> = signal(false);
  iconAfter: WritableSignal<string | false> = signal(false);
  options!: Observable<IEsfsDropdownOption<TValue>[]>;

  constructor(value: TValue, config?: IEsfsFormControlDropdownConfig<TValue>) {
    super(value, config ?? {});

    this.setupValidators();
    this.updateConfig(config);
  }

  public override updateConfig(
    config?: IEsfsFormControlDropdownConfig<TValue>
  ): void {
    const observableOptions = Array.isArray(config?.options)
      ? of(config.options)
      : config?.options;

    super.updateConfig(config);

    this.options = observableOptions ?? of([]);
  }

  protected override getExcludedFieldsFromAutoMapper(): string[] {
    return ['options'];
  }
}
