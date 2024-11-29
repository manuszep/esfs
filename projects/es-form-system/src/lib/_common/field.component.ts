import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { IESFSFieldConfig } from './field-config';
import { EsfsFormControl } from './form-control';
import { EsfsFormGroup } from './form-group';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'esfs-field-base',
  template: '',
})
export abstract class EsfsFieldComponent<
  TValue,
  TConfig extends IESFSFieldConfig,
  TControl extends EsfsFormControl<TValue, TConfig> | EsfsFormGroup
> implements OnInit, OnDestroy
{
  @Input({ required: true }) control!: TControl;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) form!: FormGroup;

  public isValid = signal(true);
  public error = signal<string | null>('');

  public label = '';
  public placeholder = '';
  public assistiveText = '';
  public textBefore = '';
  public textAfter = '';

  protected _unsubscribe = new Subject<void>();

  ngOnInit(): void {
    if (!this.control || !this.name || !this.form) {
      throw new Error('control, name and form are required inputs');
    }

    this.control.statusChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.isValid.set(this.control.status === 'VALID');
        this.error.set(
          this.control.errors ? Object.values(this.control.errors)[0] : null
        );
      });

    this.setup();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  protected setup(): void {
    const ctrl = this.control;
    const prefixValue =
      typeof ctrl.keyPrefix === 'string' ? ctrl.keyPrefix : '';
    const prefix =
      prefixValue && prefixValue !== ''
        ? `${prefixValue}_${this.name.toUpperCase()}`
        : `${this.name.toUpperCase()}`;

    this.label = `${prefix}_Q`;
    this.placeholder = `${prefix}_PH`;
    this.assistiveText = `${prefix}_AT`;
    this.textBefore = `${prefix}_TB`;
    this.textAfter = `${prefix}_TA`;
  }
}
