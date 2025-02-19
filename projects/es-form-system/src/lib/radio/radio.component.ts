import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import { EsfsFormControlRadioBase } from './radio.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

export class EsfsFormControlRadio<
  TValue = string | null
> extends EsfsFormControlRadioBase<TValue> {
  override fieldComponent = EsfsRadioComponent<TValue>;
}

@Component({
  selector: 'esfs-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
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
export class EsfsRadioComponent<TValue = string> extends EsfsFieldComponentBase<
  TValue,
  EsfsFormControlRadio<TValue>
> {
  handleChange(event: ValueChangeEvent<TValue>): void {
    this.esfsChange.emit(event.value);
  }
}
