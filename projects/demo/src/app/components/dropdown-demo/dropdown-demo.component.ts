import { Component } from '@angular/core';
import { EsfsFormControlDropdown, EsfsFormGroup } from 'es-form-system';
import { DemoLayoutComponent } from '../shared/demo-layout.component';
import { DemoStatusComponent } from '../shared/demo-status.component';
import { DemoConfigurationComponent } from '../shared/demo-configuration.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-demo',
  standalone: true,
  imports: [
    CommonModule,
    DemoLayoutComponent,
    DemoStatusComponent,
    DemoConfigurationComponent,
  ],
  templateUrl: './dropdown-demo.component.html',
})
export class DropdownDemoComponent {
  control: EsfsFormControlDropdown<string | null>;
  form: EsfsFormGroup;

  private optionSets = {
    simple: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ],
    countries: [
      { label: 'United States', value: 'US' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
      { label: 'Spain', value: 'ES' },
    ],
    colors: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Purple', value: 'purple' },
    ],
    numbers: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
      { label: 'Five', value: '5' },
    ],
  };

  constructor() {
    this.control = new EsfsFormControlDropdown<string | null>('opt2', {
      options: this.optionSets.simple,
      required: true,
      searchable: true,
      clearable: true,
      label: true,
    });

    this.form = new EsfsFormGroup(
      {
        dropdownField: this.control,
      },
      {},
      'DROPDOWN_DEMO',
      false
    );
  }

  resetForm() {
    this.form.reset();
  }

  markAllAsTouched() {
    this.form.markAllAsTouched();
  }

  changeOptions(type: keyof typeof this.optionSets) {
    this.control.updateConfig({
      options: this.optionSets[type],
    });
    this.control.setValue(null);
  }
}
