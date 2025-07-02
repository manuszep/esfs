import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
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
  @ViewChild('numberInput', { static: false })
  numberInput!: ElementRef<HTMLInputElement>;

  public handleInput(e: Event): void {
    if (isNaN(Number((e as InputEvent).data))) {
      e.preventDefault();
    }
  }

  handleChange(event: ValueChangeEvent<number | null>): void {
    this.esfsChange.emit(event.value);
  }

  handleBlur(): void {
    this.esfsBlur.emit();
  }

  handleFocus(): void {
    // Select the input value if it's 0
    if (this.control.value === 0 && this.numberInput?.nativeElement) {
      this.numberInput.nativeElement.select();
    }
  }
}
