import { Component } from '@angular/core';
import { EsfsFormControlAddress, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';

@Component({
  selector: 'app-address-demo',
  standalone: true,
  imports: [DemoLayoutComponent, DemoStatusComponent],
  templateUrl: './address-demo.component.html',
})
export class AddressDemoComponent {
  control: EsfsFormControlAddress;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlAddress(
      {
        street: '123 Main St',
        number: '456',
        city: 'Paris',
        zip: 75001,
        country: 'FR',
      },
      {}
    );

    this.form = new EsfsFormGroup(
      {
        addressField: this.control,
      },
      {},
      'ADDRESS_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  fillSampleAddress() {
    this.control.setValue({
      street: 'Broadway',
      number: '123',
      city: 'New York',
      zip: 10001,
      country: 'US',
    });
  }
}
