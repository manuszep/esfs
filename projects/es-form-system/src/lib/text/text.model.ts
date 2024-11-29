import { IESFSFieldConfigWithDecorators } from '../_common/field-config';
import {
  EsfsFormControlWithDecorators,
  IEsfsControlType,
} from '../_common/form-control';

type IInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

export interface IESFSTextConfig extends IESFSFieldConfigWithDecorators {
  type?: IInputType;
  autocomplete?: boolean;
  pattern?: string;
  minLength?: number | null;
  maxLength?: number | null;
}

export class EsfsFormControlText<
  TValue = string
> extends EsfsFormControlWithDecorators<TValue, IESFSTextConfig> {
  public controlType: IEsfsControlType = 'text';
  public type: IInputType = 'text';
  public autocomplete = false;
  public pattern = '';
  public minLength: number | null = null;
  public maxLength: number | null = null;

  public override updateConfig(config: IESFSTextConfig): void {
    super.updateConfig(config);

    this.type = config.type || this.type;
    this.autocomplete = config.autocomplete ?? this.autocomplete;
    this.pattern = config.pattern ?? this.pattern;
    this.minLength = config.minLength ?? this.minLength;
    this.maxLength = config.maxLength ?? this.maxLength;
  }
}
