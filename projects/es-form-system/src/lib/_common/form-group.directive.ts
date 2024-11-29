import { Directive, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { EsfsFormGroup } from './form-group';
import { Subscription } from 'rxjs';

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
  standalone: true,
})
export class EsfsFormGroupDirective
  extends FormGroupDirective
  implements OnInit
{
  @Input('esfsFormGroup') override form: EsfsFormGroup = null!;

  private formchangesSubscription?: Subscription;

  public ngOnInit(): void {
    this.setupPersistToSessionStorage();
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    if (this.formchangesSubscription) {
      this.formchangesSubscription.unsubscribe();
    }
  }

  private setupPersistToSessionStorage(): void {
    const key = (this.form as EsfsFormGroup).persistToSessionStorage;

    if (key && typeof key === 'string' && key.length > 0) {
      const sessionData = sessionStorage.getItem(key);

      if (sessionData) {
        const parsedData = JSON.parse(sessionData);

        this.form.patchValue(parsedData);
      }

      this.formchangesSubscription = this.form.valueChanges.subscribe(
        (value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        }
      );
    }
  }
}
