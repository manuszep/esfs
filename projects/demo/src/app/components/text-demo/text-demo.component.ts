import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsfsFormControlText, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';
import { DemoConfigurationComponent } from '../shared/demo-configuration.component';

@Component({
  selector: 'app-text-demo',
  standalone: true,
  imports: [
    CommonModule,
    DemoLayoutComponent,
    DemoStatusComponent,
    DemoConfigurationComponent,
  ],
  templateUrl: './text-demo.component.html',
})
export class TextDemoComponent {
  control: EsfsFormControlText<string>;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlText<string>('Hello World', {
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 50,
      iconBefore: 'search',
      iconAfter: 'close',
      textBefore: true,
      textAfter: true,
      label: true,
    });

    this.form = new EsfsFormGroup(
      {
        textField: this.control,
      },
      {},
      'TEXT_DEMO',
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
