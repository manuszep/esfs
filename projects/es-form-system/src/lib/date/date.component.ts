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

import { EsfsFormControlDate } from './date.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'esfs-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  standalone: true,
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
  public minDate: Signal<string> = signal<string>('');
  public maxDate: Signal<string> = signal<string>('');

  protected override setup(): void {
    super.setup();

    this.minDate = computed(() => {
      const min = this.control.min();
      return min ? min.toISOString().split('T')[0] : '';
    });

    this.maxDate = computed(() => {
      const max = this.control.max();
      return max ? max.toISOString().split('T')[0] : '';
    });
  }

  handleChange(event: ValueChangeEvent<string>): void {
    this.esfsChange.emit(event.value);
  }

  handleBlur(): void {
    this.esfsBlur.emit();
  }
}
