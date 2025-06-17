import {
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EsfsFormControl } from './form-control';
import { EsfsFormGroup } from './form-group';
import { FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'esfs-field-base',
  template: '',
})
export abstract class EsfsFieldComponentBase<
  TValue,
  TControl extends EsfsFormControl<TValue> | EsfsFormGroup<Record<string, any>>
> implements OnInit
{
  control = input.required<TControl>();
  name = input.required<string>();
  form = input.required<FormGroup>();
  esfsChangeHandler = input<(value: TValue | null) => void>();
  esfsBlurHandler = input<() => void>();

  esfsBlur = output<void>();
  esfsChange = output<TValue | null>();

  public isValid = signal(true);
  public error = signal<string | null>('');

  public label = signal('').asReadonly();
  public placeholder = signal('').asReadonly();
  public assistiveText = signal('').asReadonly();
  public textBefore = signal('').asReadonly();
  public textAfter = signal('').asReadonly();

  protected destroyRef = inject(DestroyRef);

  constructor(protected readonly _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.control() || !this.name() || !this.form()) {
      throw new Error('control, name and form are required inputs');
    }

    this.control()
      .events.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event: any) => {
          return event.touched || event.status;
        })
      )
      .subscribe((event: any) => {
        this.isValid.set(this.control().status === 'VALID');
        const errors = this.control().errors;
        this.error.set(errors ? Object.values(errors)[0] : null);
        this._cdRef.markForCheck();
      });

    this.setup();
  }

  protected setup(): void {
    const ctrl = this.control();
    const prefix = computed(() => {
      const prefixValue = ctrl.keyPrefix();
      const nameValue = this.name();

      if (!nameValue || typeof nameValue !== 'string') {
        console.warn('Invalid name value:', nameValue);
        return '';
      }

      return prefixValue && prefixValue !== ''
        ? `${prefixValue}.${nameValue.toUpperCase()}`
        : `${nameValue.toUpperCase()}`;
    });

    this.label = computed(() => `${prefix()}.Q`);
    this.placeholder = computed(() => `${prefix()}.PH`);
    this.assistiveText = computed(() => `${prefix()}.AT`);
    this.textBefore = computed(() => `${prefix()}.TB`);
    this.textAfter = computed(() => `${prefix()}.TA`);
  }
}
