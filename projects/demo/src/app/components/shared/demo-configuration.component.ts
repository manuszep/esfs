import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo-configuration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-configuration.component.html',
  styleUrl: './demo-configuration.component.scss',
})
export class DemoConfigurationComponent {
  title = input<string>('Configuration');
  expanded = signal(false);

  toggle() {
    this.expanded.set(!this.expanded());
  }
}
