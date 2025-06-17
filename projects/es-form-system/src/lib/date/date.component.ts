import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import { EsfsFormControlDateBase } from './date.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

export class EsfsFormControlDate extends EsfsFormControlDateBase {
  override fieldComponent = EsfsDateComponent;
}

@Component({
  selector: 'esfs-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsDateComponent extends EsfsFieldComponentBase<
  string,
  EsfsFormControlDate
> {
  public minDate = signal<string>('');
  public maxDate = signal<string>('');

  protected override setup(): void {
    super.setup();

    const min = this.control().min();
    if (min) {
      this.minDate.set(min.toISOString().split('T')[0]);
    }
    const max = this.control().max();
    if (max) {
      this.maxDate.set(max.toISOString().split('T')[0]);
    }
  }

  handleChange(event: ValueChangeEvent<string>): void {
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
