import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/components', pathMatch: 'full' },
  {
    path: 'components',
    loadComponent: () =>
      import(
        './components/components-overview/components-overview.component'
      ).then((m) => m.ComponentsOverviewComponent),
  },
  {
    path: 'text',
    loadComponent: () =>
      import('./components/text-demo/text-demo.component').then(
        (m) => m.TextDemoComponent
      ),
  },
  {
    path: 'number',
    loadComponent: () =>
      import('./components/number-demo/number-demo.component').then(
        (m) => m.NumberDemoComponent
      ),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./components/checkbox-demo/checkbox-demo.component').then(
        (m) => m.CheckboxDemoComponent
      ),
  },
  {
    path: 'dropdown',
    loadComponent: () =>
      import('./components/dropdown-demo/dropdown-demo.component').then(
        (m) => m.DropdownDemoComponent
      ),
  },
  {
    path: 'radio',
    loadComponent: () =>
      import('./components/radio-demo/radio-demo.component').then(
        (m) => m.RadioDemoComponent
      ),
  },
  {
    path: 'date',
    loadComponent: () =>
      import('./components/date-demo/date-demo.component').then(
        (m) => m.DateDemoComponent
      ),
  },
  {
    path: 'address',
    loadComponent: () =>
      import('./components/address-demo/address-demo.component').then(
        (m) => m.AddressDemoComponent
      ),
  },
  {
    path: 'phone',
    loadComponent: () =>
      import('./components/phone-demo/phone-demo.component').then(
        (m) => m.PhoneDemoComponent
      ),
  },
];
