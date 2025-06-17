import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'demo-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-status.component.html',
  styleUrl: './demo-status.component.scss',
})
export class DemoStatusComponent {
  control = input.required<AbstractControl>();
}
