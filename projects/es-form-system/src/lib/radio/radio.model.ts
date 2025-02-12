import { signal, WritableSignal } from '@angular/core';

import { EsfsFormControl } from '../_common/form-control';
import {
  IEsfsFieldType,
  IEsfsSignalConfigToSimpleConfig,
} from '../_common/types';
import { Observable, of } from 'rxjs';

export type IEsfsFormControlRadioConfig<TValue = string> = Partial<
  IEsfsSignalConfigToSimpleConfig<EsfsFormControlRadio<TValue>>
> & {
  options?: Observable<IEsfsRadioOption<TValue>[]> | IEsfsRadioOption<TValue>[];
};

export interface IEsfsRadioOption<TValue = null> {
  label: string;
  value: TValue;
}

export class EsfsFormControlRadio<
  TValue = string | null
> extends EsfsFormControl<TValue> {
  public fieldType: IEsfsFieldType = 'radio';

  buttonStyle: WritableSignal<boolean> = signal(false);
  options!: Observable<IEsfsRadioOption<TValue>[]>;

  constructor(value: TValue, config?: IEsfsFormControlRadioConfig<TValue>) {
    super(value, config ?? {});

    this.setupValidators();
    this.updateConfig(config);
  }

  public override updateConfig(
    config?: IEsfsFormControlRadioConfig<TValue>
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
