import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import { EsfsFormControlTextBase } from './text.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

export class EsfsFormControlText<
  TValue = string | null
> extends EsfsFormControlTextBase<TValue> {
  override fieldComponent = EsfsTextComponent<TValue>;
}

@Component({
  selector: 'esfs-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsTextComponent<TValue = string> extends EsfsFieldComponentBase<
  TValue,
  EsfsFormControlText<TValue>
> {
  handleChange(): void {
    const handler = this.esfsChangeHandler();
    if (handler) {
      handler(this.control().value);
    } else {
      this.esfsChange.emit(this.control().value);
    }
  }

  handleBlur(): void {
    const handler = this.esfsBlurHandler();
    if (handler) {
      handler();
    } else {
      this.esfsBlur.emit();
    }
  }
}
