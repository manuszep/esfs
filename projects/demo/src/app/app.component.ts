import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ES Form System Demo';

  navigationItems = [
    { label: 'Overview', path: '/components' },
    { label: 'Text Field', path: '/text' },
    { label: 'Number Field', path: '/number' },
    { label: 'Checkbox', path: '/checkbox' },
    { label: 'Dropdown', path: '/dropdown' },
    { label: 'Radio Button', path: '/radio' },
    { label: 'Date Field', path: '/date' },
    { label: 'Address Field', path: '/address' },
    { label: 'Phone Field', path: '/phone' },
  ];
}
