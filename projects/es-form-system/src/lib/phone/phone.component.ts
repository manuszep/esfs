import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

import { EsfsFieldComponentBase } from '../_common/field.component';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { EsfsDropdownComponent, EsfsFormControlDropdown } from '../dropdown';
import { EsfsFormGroup, EsfsFormGroupDirective } from '../_common';

import { EsfsFormControlPhoneBase } from './phone.model';
import { esfsPhoneCountries } from '../_common/countries';
import { EsfsFormControlNumber, EsfsNumberComponent } from '../number';

export class EsfsFormControlPhone extends EsfsFormControlPhoneBase {
  override fieldComponent = EsfsPhoneComponent;
}

@Component({
  selector: 'esfs-phone',
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsLayoutComponent,
    EsfsFormGroupDirective,
    EsfsNumberComponent,
    EsfsDropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsPhoneComponent extends EsfsFieldComponentBase<
  string | null,
  EsfsFormControlPhone
> {
  public codeField = new EsfsFormControlDropdown(null, {
    label: false,
    options: esfsPhoneCountries.map((country) => ({
      label: `COUNTRY.${country.code}`,
      value: country.number,
    })),
    required: false,
  });
  public numberField = new EsfsFormControlNumber(null, { required: false });
  public subForm!: EsfsFormGroup;

  protected override setup(): void {
    super.setup();

    this.subForm = new EsfsFormGroup(
      {
        code: this.codeField,
        number: this.numberField,
      },
      {},
      `${this.control().keyPrefix()}.${this.name().toUpperCase()}`,
      false
    );

    this.codeField.keyPrefix.set(
      `${this.control().keyPrefix()}.${this.name().toUpperCase()}`
    );
    this.numberField.keyPrefix.set(
      `${this.control().keyPrefix()}.${this.name().toUpperCase()}`
    );

    this.mapValueToFields(this.control().value);

    this.control()
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.mapValueToFields(value);
      });

    this.codeField.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.handleCodeChange();
      });

    this.numberField.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.handleNumberChange();
      });
  }

  private mapValueToFields(value: string | null): void {
    const [code, number] = value ? value.split('/') : ['', ''];

    this.codeField.setValue(code || '+32');
    this.numberField.setValue(number ? Number(number) : null);
    console.log(code || '+32');
  }

  private mapFieldsToValue(): string {
    const code = this.codeField.value ? `${this.codeField.value}/` : '';

    return `${code}${this.numberField.value}`;
  }

  handleChange(value: string | null): void {
    const handler = this.esfsChangeHandler();
    if (handler) {
      handler(value);
    } else {
      this.esfsChange.emit(value);
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

  handleCodeChange(): void {
    this.control().setValue(this.mapFieldsToValue(), { emitEvent: false });
    this.control().markAsTouched();
    this.control().markAsDirty();
    this.control().updateValueAndValidity({ emitEvent: false });
    this.handleChange(this.control().value);
  }

  handleNumberChange(): void {
    this.control().setValue(this.mapFieldsToValue(), { emitEvent: false });
    this.control().markAsTouched();
    this.control().markAsDirty();
    this.control().updateValueAndValidity({ emitEvent: false });
    this.handleChange(this.control().value);
  }
}
