Fields:

CommonProps:

- label<boolean>
- assistiveText<boolean>
- required<boolean>
- disabled<boolean>
- autofocus<boolean>
- tabIndex<number>
- updateOn<'blur' | 'change' | 'submit'>
- validation<validationFn[]>
- asyncValidation<asyncValidationFn[]>
- formToFieldMapper: (value: any) => any
- fieldToFormMapper: (value: any) => any

DecorativeProps:

- iconBefore<boolean>
- iconAfter<boolean>
- textBefore<boolean>
- textAfter<boolean>

- Address
  - FormGroup
    - street
    - number
    - zip
    - city
    - country
- Checkbox
  - FormControl
  - extraProps
    - style<'classic' | 'toggle'>
- Date
  - FormGroup
    - day
    - month
    - year
    - hour
    - minute
  - DecorativeProps
  - ExtraProps
    - min<date>
    - max<date>
    - futureAllowed<boolean>
    - pastAllowed<boolean>
- Image
  - FormControl
  - extraProps
    - folder<string>
- Number
  - FormControl
  - DecorativeProps
  - extraProps
    - min<number>
    - max<number>
- Select
  - FormControl
  - DecorativeProps
  - extraProps
    - options<selectOptions[] | observable<selectOptions[]>>
- Text
  - FormControl
  - DecorativeProps
  - extraProps
    - Type<'text' | 'email' | 'password' | 'search' | 'tel' | 'url'>
    - autocomplete<boolean>
    - valueMatcher<function>
    - pattern<string>
    - minLength<number>
    - maxLength<number>
    - options<selectOptions[] | observable<selectOptions[]>>

For icons we could provide an InjectionToken that would be used to configure TablerIconsModule like this:

{ provide: ESFS_TABLER_ICON_MODULE, useExisting: TablerIconsModule.pick(icons) }
