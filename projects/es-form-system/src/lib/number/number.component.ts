import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import { EsfsFormControlNumberBase } from './number.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

export class EsfsFormControlNumber extends EsfsFormControlNumberBase {
  override fieldComponent = EsfsNumberComponent;
}

@Component({
  selector: 'esfs-number',
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsNumberComponent extends EsfsFieldComponentBase<
  number | null,
  EsfsFormControlNumber
> {
  public handleInput(e: Event): void {
    if (isNaN(Number((e as InputEvent).data))) {
      e.preventDefault();
    }
  }

  handleChange(event: ValueChangeEvent<number | null>): void {
    const handler = this.esfsChangeHandler();
    if (handler) {
      handler(event.value);
    } else {
      this.esfsChange.emit(event.value);
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
