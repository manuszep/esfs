import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EsfsFieldComponent,
  EsfsFormControlAddress,
  EsfsFormControlCheckbox,
  EsfsFormControlNumber,
  EsfsFormControlText,
  EsfsFormGroup,
  EsfsFormGroupDirective,
} from 'es-form-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  addressControl: EsfsFormControlAddress;
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
      disabled: true,
    });

    this.numberControl = new EsfsFormControlNumber(null, { min: 4 });

    this.addressControl = new EsfsFormControlAddress({}, {});

    this.form = new EsfsFormGroup(
      {
        text: this.textControl,
        number: this.numberControl,
        checkbox: this.checkboxControl,
        address: this.addressControl,
      },
      {},
      'DEMO',
      'demo'
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
