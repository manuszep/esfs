import {
  Directive,
  forwardRef,
  Input,
  OnInit,
  Provider,
  DestroyRef,
  inject,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EsfsFormGroup } from './form-group';

const formDirectiveProvider: Provider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => EsfsFormGroupDirective),
};

/**
 * This is an extension to the formGroup directive that adds the ability to persist the form data to sessionStorage.
 * It's done here to get access to lifecycle hooks so we can destroy the subscription when the directive is destroyed.
 */

@Directive({
  selector: '[esfsFormGroup]',
  providers: [formDirectiveProvider],
  host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
  exportAs: 'esfsForm',
})
export class EsfsFormGroupDirective
  extends FormGroupDirective
  implements OnInit
{
  @Input('esfsFormGroup') override form: EsfsFormGroup = null!;

  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.setupPersistToSessionStorage();
  }

  private setupPersistToSessionStorage(): void {
    const key = (this.form as EsfsFormGroup).persistToSessionStorage;

    if (key && typeof key === 'string' && key.length > 0) {
      const sessionData = sessionStorage.getItem(key);

      if (sessionData) {
        const parsedData = JSON.parse(sessionData);

        this.form.patchValue(parsedData);
      }

      this.form.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        });
    }
  }
}
