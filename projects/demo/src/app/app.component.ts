import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EsfsFieldComponent,
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
  control: EsfsFormControlText<string>;
  form: EsfsFormGroup;

  constructor() {
    this.control = new EsfsFormControlText<string>('', {
      textBefore: true,
      updateOn: 'change',
      required: true,
    });

    this.form = new EsfsFormGroup(
      {
        text: this.control,
      },
      {},
      'DEMO',
      'demo'
    );
  }
}
