import {
  ChangeDetectorRef,
  Component,
  computed,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { EsfsFormControl } from './form-control';
import { EsfsFormGroup } from './form-group';
import { ControlEvent, FormGroup } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'esfs-field-base',
  template: '',
})
export abstract class EsfsFieldComponentBase<
  TValue,
  TControl extends EsfsFormControl<TValue> | EsfsFormGroup<Record<string, any>>
> implements OnInit, OnDestroy
{
  @Input({ required: true }) control!: TControl;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) form!: FormGroup;

  public isValid = signal(true);
  public error = signal<string | null>('');

  public label = signal('').asReadonly();
  public placeholder = signal('').asReadonly();
  public assistiveText = signal('').asReadonly();
  public textBefore = signal('').asReadonly();
  public textAfter = signal('').asReadonly();

  protected _unsubscribe = new Subject<void>();

  constructor(protected readonly _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.control || !this.name || !this.form) {
      throw new Error('control, name and form are required inputs');
    }

    this.control.events
      .pipe(
        takeUntil(this._unsubscribe),
        filter((event: any) => {
          return event.touched || event.status;
        })
      )
      .subscribe((event: any) => {
        this.isValid.set(this.control.status === 'VALID');
        this.error.set(
          this.control.errors ? Object.values(this.control.errors)[0] : null
        );
        this._cdRef.markForCheck();
      });

    this.setup();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  protected setup(): void {
    const ctrl = this.control;
    const prefix = computed(() => {
      const prefixValue = ctrl.keyPrefix();

      return prefixValue && prefixValue !== ''
        ? `${prefixValue}.${this.name.toUpperCase()}`
        : `${this.name.toUpperCase()}`;
    });

    this.label = computed(() => `${prefix()}.Q`);
    this.placeholder = computed(() => `${prefix()}.PH`);
    this.assistiveText = computed(() => `${prefix()}.AT`);
    this.textBefore = computed(() => `${prefix()}.TB`);
    this.textAfter = computed(() => `${prefix()}.TA`);
  }
}
