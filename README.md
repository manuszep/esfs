# ES Form System

[![Create release](https://github.com/manuszep/esfs/actions/workflows/create-release.yaml/badge.svg)](https://github.com/manuszep/esfs/actions/workflows/create-release.yaml)

A comprehensive Angular form system library that provides type-safe, reactive form components with built-in validation and internationalization support.

## Features

- **Type-safe forms** with TypeScript support
- **Signal-based reactivity** using Angular's signals
- **Built-in validation** with custom validators support
- **Internationalization ready** with translation key generation
- **Accessible components** following ARIA guidelines
- **Modular architecture** for easy customization
- **Standalone components** for modern Angular applications

## Installation

```bash
npm install @manuszep/es-form-system
```

## Quick Start

### 1. Import the library in your module or standalone component

```typescript
import {
  EsfsFieldComponent,
  EsfsFormGroupDirective,
  EsfsFormGroup,
  EsfsFormControlText
} from '@manuszep/es-form-system';

@Component({
  // ... your component configuration
  imports: [
    EsfsFieldComponent,
    EsfsFormGroupDirective,
    // Import specific form control classes as needed
  ]
})
```

### 2. Create a form configuration

```typescript
export class MyComponent {
  form = new EsfsFormGroup({
    firstName: new EsfsFormControlText("", {
      required: true,
      minLength: 2,
      maxLength: 50,
    }),
    email: new EsfsFormControlText("", {
      type: "email",
      required: true,
    }),
  });
}
```

### 3. Use in your template

```html
<form [esfsFormGroup]="form">
  <esfs-field name="firstName"></esfs-field>
  <esfs-field name="email"></esfs-field>
</form>
```

## Available Components

### Form Components

- **`EsfsFormGroup`** - Container for form fields with validation and state management
- **`EsfsFormGroupDirective`** - Directive to bind form to template (use `[esfsFormGroup]`)
- **`EsfsFieldComponent`** - Universal field component that infers the correct field type

### Form Control Classes

#### Text Control (`EsfsFormControlText`)

Single-line text input with various types and validation options.

```typescript
new EsfsFormControlText("", {
  type: "text", // 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  placeholder: "Enter your username",
  required: true,
  minLength: 3,
  maxLength: 50,
  pattern: "^[a-zA-Z0-9_]+$",
  iconBefore: "search",
  iconAfter: "close",
  textBefore: true,
  textAfter: true,
});
```

#### Number Control (`EsfsFormControlNumber`)

Numeric input with min/max constraints.

```typescript
new EsfsFormControlNumber(0, {
  min: 0,
  max: 120,
  required: true,
});
```

#### Date Control (`EsfsFormControlDate`)

Date input with year, month, day, hour, and minute components.

```typescript
new EsfsFormControlDate(null, {
  min: new Date("1900-01-01"),
  max: new Date(),
  futureAllowed: false,
  pastAllowed: true,
  textBefore: true,
});
```

#### Dropdown Control (`EsfsFormControlDropdown`)

Select dropdown with options from array or observable.

```typescript
new EsfsFormControlDropdown("", {
  options: [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ],
  required: true,
});
```

#### Checkbox Control (`EsfsFormControlCheckbox`)

Boolean input with toggle or classic styling.

```typescript
new EsfsFormControlCheckbox(false, {
  style: "classic", // 'classic' | 'toggle'
  required: true,
});
```

#### Radio Control (`EsfsFormControlRadio`)

Radio button group for single selection.

```typescript
new EsfsFormControlRadio("", {
  buttonStyle: true,
  options: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ],
  required: true,
});
```

#### Phone Control (`EsfsFormControlPhone`)

Phone number input with country code support.

```typescript
new EsfsFormControlPhone("", {
  required: true,
});
```

#### Address Control (`EsfsFormControlAddress`)

Complex address form with street, number, zip, city, and country fields.

```typescript
new EsfsFormControlAddress(
  {
    street: "",
    number: "",
    zip: "",
    city: "",
    country: "",
  },
  {
    required: true,
  }
);
```

## Template Usage

### Universal Field Component

The `esfs-field` component automatically infers the correct field type based on the form control configuration:

```html
<form [esfsFormGroup]="form">
  <!-- Automatically renders as text input -->
  <esfs-field name="firstName"></esfs-field>

  <!-- Automatically renders as email input -->
  <esfs-field name="email"></esfs-field>

  <!-- Automatically renders as number input -->
  <esfs-field name="age"></esfs-field>

  <!-- Automatically renders as dropdown -->
  <esfs-field name="country"></esfs-field>

  <!-- Automatically renders as checkbox -->
  <esfs-field name="acceptTerms"></esfs-field>

  <!-- Automatically renders as date picker -->
  <esfs-field name="birthDate"></esfs-field>

  <!-- Automatically renders as address form -->
  <esfs-field name="address"></esfs-field>
</form>
```

### Form Group Directive

Use the `esfsFormGroup` directive to bind your form to the template:

```html
<form [esfsFormGroup]="form">
  <!-- Your fields here -->
</form>
```

## Common Configuration Properties

All form control classes support these common properties:

### Basic Properties

- `required: boolean` - Whether the field is required
- `disabled: boolean` - Whether the field is disabled
- `updateOn: 'change' | 'blur' | 'submit'` - When to trigger validation

### Decorative Properties

- `textBefore: boolean` - Display text before the field
- `textAfter: boolean` - Display text after the field
- `iconBefore: string` - Icon to display before the field
- `iconAfter: string` - Icon to display after the field

### Validation Properties

- `validators: ValidatorFn[]` - Angular validators array
- `asyncValidators: AsyncValidatorFn[]` - Async validators array

## Internationalization

The library automatically generates translation keys based on field names and prefixes:

- `{PREFIX}.{FIELD_NAME}.Q` - Label
- `{PREFIX}.{FIELD_NAME}.PH` - Placeholder
- `{PREFIX}.{FIELD_NAME}.AT` - Assistive text
- `{PREFIX}.{FIELD_NAME}.TB` - Text before
- `{PREFIX}.{FIELD_NAME}.TA` - Text after

Example: For a field named `firstName` with prefix `user`, the keys would be:

- `USER.FIRSTNAME.Q`
- `USER.FIRSTNAME.PH`
- `USER.FIRSTNAME.AT`
- etc.

## Events

All field components emit standard events:

- `esfsBlur: EventEmitter<void>` - Fired when field loses focus
- `esfsChange: EventEmitter<TValue | null>` - Fired when field value changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
