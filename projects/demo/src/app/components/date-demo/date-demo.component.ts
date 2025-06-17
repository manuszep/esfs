import { Component } from '@angular/core';
import { EsfsFormControlDate, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';

@Component({
  selector: 'app-date-demo',
  standalone: true,
  imports: [DemoLayoutComponent, DemoStatusComponent],
  templateUrl: './date-demo.component.html',
})
export class DateDemoComponent {
  control: EsfsFormControlDate;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlDate('2024-12-25', {
      required: true,
      min: new Date('2024-01-01'),
      max: new Date('2025-12-31'),
    });

    this.form = new EsfsFormGroup(
      {
        dateField: this.control,
      },
      {},
      'DATE_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  setToday() {
    const today = new Date().toISOString().split('T')[0];
    this.control.setValue(today);
  }
}
