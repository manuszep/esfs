import { Component } from '@angular/core';
import { EsfsFormControlPhone, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';

@Component({
  selector: 'app-phone-demo',
  standalone: true,
  imports: [DemoLayoutComponent, DemoStatusComponent],
  templateUrl: './phone-demo.component.html',
})
export class PhoneDemoComponent {
  control: EsfsFormControlPhone;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlPhone('+33123456789', {});

    this.form = new EsfsFormGroup(
      {
        phoneField: this.control,
      },
      {},
      'PHONE_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  fillSamplePhone() {
    this.control.setValue('+1234567890');
  }
}
