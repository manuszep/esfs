import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EsfsFieldComponent,
  EsfsFormControlAddress,
  EsfsFormControlCheckbox,
  EsfsFormControlDropdown,
  EsfsFormControlNumber,
  EsfsFormControlText,
  EsfsFormGroup,
  EsfsFormGroupDirective,
  EsfsFormControlDate,
  EsfsFormControlPhone,
  EsfsFormControlRadio,
} from 'es-form-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EsfsFieldComponent,
    EsfsFormGroupDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  textControl: EsfsFormControlText<string>;
  numberControl: EsfsFormControlNumber;
  checkboxControl: EsfsFormControlCheckbox;
  checkboxControl2: EsfsFormControlCheckbox;
  dropdownControl: EsfsFormControlDropdown<number | null>;
  addressControl: EsfsFormControlAddress;
  dateControl: EsfsFormControlDate;
  phoneControl: EsfsFormControlPhone;
  radioControl: EsfsFormControlRadio<number | null>;
  form: EsfsFormGroup;

  constructor() {
    this.textControl = new EsfsFormControlText<string>('', {
      textBefore: true,
      textAfter: true,
      updateOn: 'change',
      required: true,
      minLength: 3,
      iconBefore: 'search',
      iconAfter: 'close',
    });

    this.checkboxControl = new EsfsFormControlCheckbox(false, {
      disabled: false,
    });

    this.checkboxControl2 = new EsfsFormControlCheckbox(false, {
      disabled: false,
      style: 'classic',
      required: false,
    });

    this.numberControl = new EsfsFormControlNumber(null, { min: 4 });

    this.addressControl = new EsfsFormControlAddress({}, {});

    this.dropdownControl = new EsfsFormControlDropdown<number | null>(3, {
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
        { label: 'Option 5', value: 5 },
        { label: 'abc', value: 0 },
      ],
    });

    this.dateControl = new EsfsFormControlDate('', {
      min: new Date('2024-11-01'),
      textBefore: true,
    });

    this.phoneControl = new EsfsFormControlPhone('', {});

    this.radioControl = new EsfsFormControlRadio<number | null>(null, {
      buttonStyle: true,
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
        { label: 'Option 5', value: 5 },
        { label: 'abc', value: 0 },
      ],
    });

    this.form = new EsfsFormGroup(
      {
        text: this.textControl,
        number: this.numberControl,
        checkbox: this.checkboxControl,
        checkbox2: this.checkboxControl2,
        dropdown: this.dropdownControl,
        address: this.addressControl,
        date: this.dateControl,
        phone: this.phoneControl,
        radio: this.radioControl,
      },
      {},
      'DEMO',
      false
    );
  }

  handleButtonClick() {
    this.textControl.iconAfter.set('attach_email');
    this.textControl.textAfter.set(false);
    this.textControl.required.set(false);
    this.textControl.minLength.set(0);
    this.textControl.updateValueAndValidity();
  }
}
