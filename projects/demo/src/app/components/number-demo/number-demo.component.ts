import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsfsFormControlNumber, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';
import { DemoConfigurationComponent } from '../shared/demo-configuration.component';

@Component({
  selector: 'app-number-demo',
  standalone: true,
  imports: [
    CommonModule,
    DemoLayoutComponent,
    DemoStatusComponent,
    DemoConfigurationComponent,
  ],
  templateUrl: './number-demo.component.html',
})
export class NumberDemoComponent {
  control: EsfsFormControlNumber;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlNumber(42, {
      required: true,
      min: 0,
      max: 100,
      iconBefore: 'attach_money',
      label: true,
    });

    this.form = new EsfsFormGroup(
      {
        numberField: this.control,
      },
      {},
      'NUMBER_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }
}
