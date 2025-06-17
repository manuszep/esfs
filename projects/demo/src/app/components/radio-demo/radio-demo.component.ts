import { Component } from '@angular/core';
import { EsfsFormControlRadio, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [DemoLayoutComponent, DemoStatusComponent],
  templateUrl: './radio-demo.component.html',
})
export class RadioDemoComponent {
  control: EsfsFormControlRadio<string>;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlRadio<string>('option2', {
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      buttonStyle: false,
      required: true,
    });

    this.form = new EsfsFormGroup(
      {
        radioField: this.control,
      },
      {},
      'RADIO_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  toggleButtonStyle() {
    this.control.buttonStyle.set(!this.control.buttonStyle());
  }
}
