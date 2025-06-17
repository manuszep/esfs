import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EsfsFormGroup,
  EsfsFieldComponent,
  EsfsFormGroupDirective,
} from 'es-form-system';

@Component({
  selector: 'demo-layout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EsfsFieldComponent,
    EsfsFormGroupDirective,
  ],
  templateUrl: './demo-layout.component.html',
  styleUrl: './demo-layout.component.scss',
})
export class DemoLayoutComponent {
  title = input.required<string>();
  description = input.required<string>();
  form = input.required<EsfsFormGroup>();
  fieldName = input.required<string>();
}
