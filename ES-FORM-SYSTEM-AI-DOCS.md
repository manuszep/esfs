# ES-Form-System Library - AI Documentation

## Library Overview

**es-form-system** is an Angular 19 reactive form library that extends Angular's native FormControl, FormArray, and FormGroup with signal-based reactive configurations. It provides a component-driven approach to form building with strong TypeScript typing.

## Core Architecture

### Extended Form Controls

- `EsfsFormControl<TValue>` - Extends Angular's FormControl with signal-based configuration
- `EsfsFormGroup<TValue>` - Extends Angular's FormGroup with signal-based configuration
- `EsfsFormArray<TValue>` - Extends Angular's FormArray with signal-based configuration

### Component System

- `EsfsFieldComponent<TValue>` - Central dispatcher component that renders appropriate field components
- `EsfsLayoutComponent` - Wrapper component for field layout (labels, errors, decorations)
- Field-specific components (text, dropdown, checkbox, etc.) that inherit from `EsfsFieldComponentBase`

### Configuration Classes

Field configurations are type-safe classes with signal-based properties, not plain objects.

## Installation & Setup

```typescript
import { EsfsFormControl, EsfsFormGroup, EsfsFieldComponent } from "es-form-system";
```

## Core Types & Interfaces

```typescript
// Field types available
type IEsfsFieldType = "none" | "address" | "checkbox" | "date" | "dropdown" | "number" | "phone" | "radio" | "text";

// Update strategies
type IEsfsFieldUpdateStrategy = "change" | "blur" | "submit";

// Configuration type helper
type IEsfsSignalConfigToSimpleConfig<TType, TValue = any> = {
  disabled: boolean;
  updateOn?: IEsfsFieldUpdateStrategy;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  formToFieldMapper?: (value: TValue) => any;
  fieldToFormMapper?: (value: any) => TValue;
} & SignalProperties<TType>;
```

## Form Creation Pattern

### Basic Form Structure

```typescript
// Create form controls with configuration
const nameControl = new EsfsFormControlText("", {
  required: true,
  minLength: 2,
  maxLength: 50,
});

// Create form group
const form = new EsfsFormGroup({
  name: nameControl,
  email: new EsfsFormControlText("", { type: "email" }),
});
```

### Template Usage

```html
<form [formGroup]="form" esfsFormGroup>
  <esfs-field name="name"></esfs-field>
  <esfs-field name="email"></esfs-field>
</form>
```

## Available Field Types

### Text Field

```typescript
class EsfsFormControlText<TValue = string> extends EsfsFormControlTextBase<TValue> {
  // Signal properties
  pattern: WritableSignal<string>;
  minLength: WritableSignal<number | null>;
  maxLength: WritableSignal<number | null>;
  type: WritableSignal<"text" | "email" | "password" | "search" | "tel" | "url">;
  clearable: WritableSignal<boolean>;
  autocomplete: WritableSignal<boolean>;
  textBefore: WritableSignal<boolean>;
  textAfter: WritableSignal<boolean>;
  iconBefore: WritableSignal<string | false>;
  iconAfter: WritableSignal<string | false>;
}

// Usage
const textControl = new EsfsFormControlText("initial value", {
  required: true,
  type: "email",
  minLength: 5,
  maxLength: 100,
  clearable: true,
});
```

### Dropdown Field

```typescript
interface IEsfsDropdownOption<TValue = null> {
  label: string;
  value: TValue;
}

class EsfsFormControlDropdown<TValue = string> extends EsfsFormControlDropdownBase<TValue> {
  // Signal properties
  searchable: WritableSignal<boolean>;
  clearable: WritableSignal<boolean>;
  options: Observable<IEsfsDropdownOption<TValue>[]>;
  compareOptionsToValue: WritableSignal<(option: IEsfsDropdownOption<TValue>, value: any) => boolean>;
}

// Usage
const dropdownControl = new EsfsFormControlDropdown(null, {
  required: true,
  searchable: true,
  clearable: true,
  options: [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ],
});
```

### Checkbox Field

```typescript
class EsfsFormControlCheckbox extends EsfsFormControlCheckboxBase<boolean> {
  // Inherits common checkbox properties
}

// Usage
const checkboxControl = new EsfsFormControlCheckbox(false, {
  required: true,
});
```

### Date Field

```typescript
class EsfsFormControlDate extends EsfsFormControlDateBase {
  // Signal properties
  min: WritableSignal<Date | null>;
  max: WritableSignal<Date | null>;
  future: WritableSignal<boolean>;
  textBefore: WritableSignal<boolean>;
  textAfter: WritableSignal<boolean>;
  iconBefore: WritableSignal<string | false>;
  iconAfter: WritableSignal<string | false>;
}

// Usage
const dateControl = new EsfsFormControlDate("", {
  required: true,
  min: new Date("2020-01-01"),
  max: new Date("2030-12-31"),
  future: false,
});
```

### Number Field

```typescript
class EsfsFormControlNumber extends EsfsFormControlNumberBase {
  // Signal properties
  min: WritableSignal<number | null>;
  max: WritableSignal<number | null>;
  clearable: WritableSignal<boolean>;
  autocomplete: WritableSignal<boolean>;
  textBefore: WritableSignal<boolean>;
  textAfter: WritableSignal<boolean>;
  iconBefore: WritableSignal<string | false>;
  iconAfter: WritableSignal<string | false>;
}

// Usage
const numberControl = new EsfsFormControlNumber(null, {
  required: true,
  min: 0,
  max: 100,
  clearable: true,
});
```

### Phone Field

```typescript
class EsfsFormControlPhone extends EsfsFormControlPhoneBase {
  // Signal properties
  clearable: WritableSignal<boolean>;
  textBefore: WritableSignal<boolean>;
  textAfter: WritableSignal<boolean>;
  iconBefore: WritableSignal<string | false>;
  iconAfter: WritableSignal<string | false>;
}

// Usage
const phoneControl = new EsfsFormControlPhone(null, {
  required: true,
  clearable: true,
});
```

### Radio Field

```typescript
interface IEsfsRadioOption<TValue = null> {
  label: string;
  value: TValue;
}

class EsfsFormControlRadio<TValue = string> extends EsfsFormControlRadioBase<TValue> {
  // Signal properties
  buttonStyle: WritableSignal<boolean>;
  options: Observable<IEsfsRadioOption<TValue>[]>;
}

// Usage
const radioControl = new EsfsFormControlRadio("", {
  required: true,
  buttonStyle: false,
  options: [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ],
});
```

### Address Field

```typescript
interface IEsfsFormControlAddressValue {
  street: string;
  number: string;
  city: string;
  zip: number;
  country: string;
}

class EsfsFormControlAddress extends EsfsFormControlAddressBase {
  // Composite form group with sub-fields
  street: EsfsFormControlText;
  number: EsfsFormControlText;
  city: EsfsFormControlText;
  zip: EsfsFormControlNumber;
  country: EsfsFormControlDropdown;

  // Signal properties
  label: WritableSignal<string | boolean>;
}

// Usage
const addressControl = new EsfsFormControlAddress({
  street: "123 Main St",
  number: "Apt 4B",
  city: "New York",
  zip: 10001,
  country: "US",
});
```

## Common Control Properties

All form controls inherit these signal-based properties:

```typescript
class EsfsFormControl<TValue> {
  // Identification
  guid: string; // Auto-generated UUID

  // Signal properties (all reactive)
  keyPrefix: WritableSignal<string>;
  required: WritableSignal<boolean>;
  autofocus: WritableSignal<boolean>;
  tabIndex: WritableSignal<number>;
  label: WritableSignal<string | boolean>;
  placeholder: WritableSignal<string | boolean>;
  help: WritableSignal<string | boolean>;

  // Field identification
  fieldType: IEsfsFieldType;
  fieldComponent: any; // Component class to render
}
```

## Validation System

### Built-in Validators

```typescript
const esfsValidators = {
  email: (message?: string) => ValidatorFn,
  max: (max: number, message?: string) => ValidatorFn,
  maxLength: (maxLength: number, message?: string) => ValidatorFn,
  min: (min: number, message?: string) => ValidatorFn,
  minLength: (minLength: number, message?: string) => ValidatorFn,
  pattern: (pattern: string | RegExp, message?: string) => ValidatorFn,
  required: (message?: string) => ValidatorFn,
  requiredTrue: (message?: string) => ValidatorFn,
  date: (message?: string) => ValidatorFn,
  minDate: (min: Date, message?: string) => ValidatorFn,
  maxDate: (max: Date, message?: string) => ValidatorFn,
  futureDate: (message?: string) => ValidatorFn,
};
```

### Custom Validation

```typescript
const control = new EsfsFormControlText("", {
  validators: [esfsValidators.required(), esfsValidators.minLength(3), esfsValidators.pattern(/^[A-Za-z]+$/, "lettersOnly")],
});
```

## Signal-Based Reactivity

### Reading Signal Values

```typescript
const control = new EsfsFormControlText("");
const isRequired = control.required(); // Read current value
control.required.set(true); // Update value
```

### Reactive Updates

```typescript
// Signal changes automatically trigger validation and UI updates
effect(() => {
  if (control.required()) {
    console.log("Field is now required");
  }
});
```

## Translation Integration

The library integrates with `@ngx-translate/core`:

```typescript
// Translation keys are auto-generated based on keyPrefix and field name
// Pattern: `${keyPrefix}.${fieldName.toUpperCase()}.${suffix}`
// Suffixes: Q (question/label), PH (placeholder), AT (assistive text), TB (text before), TA (text after), ERROR
```

## Form Group Configuration

```typescript
const form = new EsfsFormGroup(
  {
    // Form controls configuration
    name: new EsfsFormControlText(""),
    email: new EsfsFormControlText(""),
  },
  { updateOn: "blur" }, // Form options
  "USER_FORM", // Key prefix for translations
  "userFormData", // Session storage key (optional)
  { name: "John" } // Initial data (optional)
);
```

## Error Handling

```typescript
// Errors are automatically handled through the pipe system
// Template automatically shows errors when field is dirty/touched
// Custom error messages via translation keys:
// `${keyPrefix}.${fieldName}.ERROR.${errorType}`
```

## Field Component Development

### Creating Custom Field Components

```typescript
@Component({
  selector: "esfs-custom-field",
  template: "...",
  imports: [EsfsLayoutComponent /* other imports */],
})
export class EsfsCustomFieldComponent<TValue> extends EsfsFieldComponentBase<TValue, EsfsFormControlCustom<TValue>> {
  handleChange(): void {
    const handler = this.esfsChangeHandler();
    if (handler) {
      handler(this.control().value);
    } else {
      this.esfsChange.emit(this.control().value);
    }
  }

  handleBlur(): void {
    const handler = this.esfsBlurHandler();
    if (handler) {
      handler();
    } else {
      this.esfsBlur.emit();
    }
  }
}

// Corresponding FormControl class
export class EsfsFormControlCustom<TValue> extends EsfsFormControl<TValue> {
  override fieldComponent = EsfsCustomFieldComponent<TValue>;
  override fieldType: IEsfsFieldType = "custom";

  // Add custom signal properties here
  customProperty: WritableSignal<string> = signal("");
}
```

## Layout System

The `EsfsLayoutComponent` provides consistent field wrapping:

```typescript
@Input() id?: string;
@Input() canTypeIn = true;
@Input() label?: string;
@Input() iconBefore?: string | false;
@Input() iconAfter?: string | false;
@Input() textBefore?: string;
@Input() textAfter?: string;
@Input() multiFields = false;
@Input() disabled = false;
@Input() hasError = false;
@Input() value: unknown; // Automatically determines hasValue state
```

## Key Design Patterns

1. **Signal-Based Configuration**: All field properties use Angular signals for reactivity
2. **Component Composition**: Central `EsfsFieldComponent` dispatches to specific field components
3. **Type Safety**: Strong TypeScript typing throughout with generic constraints
4. **Configuration Classes**: Use classes instead of plain objects for better IDE support
5. **Automatic Validation**: Validators are built into field configuration and run reactively
6. **Translation Integration**: Automatic translation key generation and integration
7. **Layout Consistency**: Unified layout component for all field types

## Best Practices for AI Implementation

1. Always import specific control classes (e.g., `EsfsFormControlText`) not base classes
2. Use the configuration object in constructors for initial setup
3. Access signal values with `()` syntax: `control.required()`
4. Set signal values with `.set()`: `control.required.set(true)`
5. Use `EsfsFormGroup` constructor with all parameters for complete setup
6. Template structure: `<form [formGroup]="form" esfsFormGroup><esfs-field name="fieldName"></esfs-field></form>`
7. For custom validators, use the `esfsValidators` helper functions
8. Field components should extend `EsfsFieldComponentBase` and implement change/blur handlers
9. Always specify the `fieldComponent` property in custom FormControl classes
10. Use the `EsfsLayoutComponent` for consistent field presentation

## Available Exports

```typescript
// Core classes
export { EsfsFormControl, EsfsFormGroup, EsfsFormArray };
export { EsfsFieldComponent, EsfsLayoutComponent };

// Field types and their components
export { EsfsFormControlText, EsfsTextComponent };
export { EsfsFormControlDropdown, EsfsDropdownComponent };
export { EsfsFormControlCheckbox, EsfsCheckboxComponent };
export { EsfsFormControlDate, EsfsDateComponent };
export { EsfsFormControlNumber, EsfsNumberComponent };
export { EsfsFormControlPhone, EsfsPhoneComponent };
export { EsfsFormControlRadio, EsfsRadioComponent };
export { EsfsFormControlAddress, EsfsAddressComponent };

// Utilities
export { esfsValidators };
export { EsfsFormErrorPipe };
export { EsfsFormGroupDirective };

// Types
export { IEsfsFieldType, IEsfsFieldUpdateStrategy };
export { IEsfsDropdownOption };
```
