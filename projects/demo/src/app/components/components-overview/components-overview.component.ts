import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EsfsFormControlAddress,
  EsfsFormControlCheckbox,
  EsfsFormControlDropdown,
  EsfsFormControlNumber,
  EsfsFormControlText,
  EsfsFormGroup,
  EsfsFormControlDate,
  EsfsFormControlPhone,
  EsfsFormControlRadio,
  EsfsFieldComponent,
  EsfsFormGroupDirective,
} from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';

@Component({
  selector: 'app-components-overview',
  standalone: true,
  imports: [
    CommonModule,
    DemoLayoutComponent,
    EsfsFieldComponent,
    EsfsFormGroupDirective,
  ],
  templateUrl: './components-overview.component.html',
  styleUrl: './components-overview.component.scss',
})
export class ComponentsOverviewComponent {
  textControl: EsfsFormControlText<string>;
  numberControl: EsfsFormControlNumber;
  checkboxControl: EsfsFormControlCheckbox;
  dropdownControl: EsfsFormControlDropdown<number | null>;
  addressControl: EsfsFormControlAddress;
  dateControl: EsfsFormControlDate;
  phoneControl: EsfsFormControlPhone;
  radioControl: EsfsFormControlRadio<number | null>;
  form: EsfsFormGroup;

  constructor() {
    this.textControl = new EsfsFormControlText<string>('Hello World', {
      required: true,
      minLength: 3,
    });

    this.numberControl = new EsfsFormControlNumber(42, {
      min: 0,
      max: 100,
    });

    this.checkboxControl = new EsfsFormControlCheckbox(true, {
      required: true,
    });

    this.dropdownControl = new EsfsFormControlDropdown<number | null>(2, {
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
      required: true,
    });

    this.radioControl = new EsfsFormControlRadio<number | null>(1, {
      options: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
      required: true,
    });

    this.dateControl = new EsfsFormControlDate('2024-12-25', {
      required: true,
    });

    this.phoneControl = new EsfsFormControlPhone('+33123456789', {
      required: true,
    });

    this.addressControl = new EsfsFormControlAddress(
      {
        street: '123 Main St',
        city: 'Paris',
        zip: 75001,
        country: 'FR',
      },
      {}
    );

    this.form = new EsfsFormGroup(
      {
        text: this.textControl,
        number: this.numberControl,
        checkbox: this.checkboxControl,
        dropdown: this.dropdownControl,
        radio: this.radioControl,
        date: this.dateControl,
        phone: this.phoneControl,
        address: this.addressControl,
      },
      {},
      'OVERVIEW',
      false
    );
  }
}
