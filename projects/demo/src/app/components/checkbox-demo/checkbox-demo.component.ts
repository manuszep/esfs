import { Component } from '@angular/core';
import { EsfsFormControlCheckbox, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';
import { DemoConfigurationComponent } from '../shared/demo-configuration.component';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    DemoLayoutComponent,
    DemoStatusComponent,
    DemoConfigurationComponent,
  ],
  templateUrl: './checkbox-demo.component.html',
})
export class CheckboxDemoComponent {
  control: EsfsFormControlCheckbox;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlCheckbox(true, {
      required: true,
      style: 'classic',
      label: true,
    });

    this.form = new EsfsFormGroup(
      {
        checkboxField: this.control,
      },
      {},
      'CHECKBOX_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  toggleValue() {
    this.control.setValue(!this.control.value);
  }
}
