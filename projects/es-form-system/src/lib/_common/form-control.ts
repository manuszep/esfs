import {
  AsyncValidatorFn,
  FormControl,
  FormControlState,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import {
  IESFSFieldConfig,
  IESFSFieldConfigWithDecorators,
} from './field-config';

export type IEsfsControlType = 'text' | 'radio' | 'checkbox' | 'select';

export abstract class EsfsFormControl<
  TValue = any,
  TConfig extends IESFSFieldConfig = IESFSFieldConfig
> extends FormControl<TValue | null> {
  public abstract controlType: IEsfsControlType;
  public uuid = crypto.randomUUID();
  public keyPrefix = '';
  public label = true;
  public assistiveText = false;
  public required = false;
  public autofocus = false;
  public tabIndex = 0;
  public validation = [] as ValidatorFn[];
  public asyncValidation = [] as AsyncValidatorFn[];
  public formToFieldMapper = (value: TValue) => value;
  public fieldToFormMapper = (value: TValue) => value;

  constructor(value: TValue, config?: TConfig) {
    super(
      {
        value: value,
        disabled: config?.disabled,
      } as FormControlState<TValue>,
      {
        updateOn: config?.updateOn ?? 'blur',
        validators: config?.validation,
        asyncValidators: config?.asyncValidation,
      }
    );

    this.updateConfig(config || ({} as TConfig));
  }

  public updateConfig(config: TConfig): void {
    this.keyPrefix = config.keyPrefix || this.keyPrefix;
    this.label = config.label ?? this.label;
    this.assistiveText = config.assistiveText ?? this.assistiveText;
    this.required = config.required ?? this.required;
    this.autofocus = config.autofocus ?? this.autofocus;
    this.tabIndex = config.tabIndex ?? this.tabIndex;
    this.validation = config.validation ?? this.validation;
    this.asyncValidation = config.asyncValidation ?? this.asyncValidation;
    this.formToFieldMapper = config.formToFieldMapper ?? this.formToFieldMapper;
    this.fieldToFormMapper = config.fieldToFormMapper ?? this.fieldToFormMapper;

    this.setupValidators();
  }

  setupValidators(): void {
    if (this.required) {
      this.addValidators([Validators.required]);
    }
  }
}

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
