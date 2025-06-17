import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import { EsfsFormControlCheckboxBase } from './checkbox.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

export class EsfsFormControlCheckbox extends EsfsFormControlCheckboxBase {
  override fieldComponent = EsfsCheckboxComponent;
}

@Component({
  selector: 'esfs-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsCheckboxComponent extends EsfsFieldComponentBase<
  boolean,
  EsfsFormControlCheckbox
> {
  handleChange(event: ValueChangeEvent<boolean>): void {
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
