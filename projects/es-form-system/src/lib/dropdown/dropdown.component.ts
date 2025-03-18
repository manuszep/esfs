import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatestWith, takeUntil } from 'rxjs';

import { EsfsLayoutComponent } from '../_layout/layout.component';
import { EsfsFieldComponentBase } from '../_common/field.component';

import {
  EsfsFormControlDropdownBase,
  IEsfsDropdownOption,
} from './dropdown.model';
import { EsfsFormControlText } from '../text';
import { EsfsFormGroup } from '../_common';
import { esfsValidateDropdown } from './dropdown.validator';

export class EsfsFormControlDropdown<
  TValue = string | null
> extends EsfsFormControlDropdownBase<TValue> {
  override fieldComponent = EsfsDropdownComponent<TValue>;
}

@Component({
  selector: 'esfs-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsDropdownComponent<
  TValue = string | null
> extends EsfsFieldComponentBase<TValue, EsfsFormControlDropdown<TValue>> {
  public searchControl: EsfsFormControlText<string>;
  public searchForm: EsfsFormGroup;
  public filteredOptions = signal<IEsfsDropdownOption<TValue>[]>([]);
  public selectedValue = signal<string>('');

  constructor(
    protected override readonly _cdRef: ChangeDetectorRef,
    private readonly translateService: TranslateService
  ) {
    super(_cdRef);

    this.searchControl = new EsfsFormControlText<string>('', {});
    this.searchForm = new EsfsFormGroup({
      search: this.searchControl,
    });
  }

  public override setup(): void {
    super.setup();

    this.control.addValidators(
      esfsValidateDropdown(this.searchControl, this.filteredOptions)
    );

    this.control.options
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((options) => {
        this.filteredOptions.set(options);
        this.searchForm.get('search')?.setValue('', { emitEvent: false });

        if (
          this.control.value !== null &&
          typeof this.control.value !== 'undefined'
        ) {
          const valueComparator =
            this.control.compareOptionsToValue() ??
            ((option: any, value: any) => option.value === value);
          const matchingOption = options.find((option) =>
            valueComparator(option, this.control.value)
          )?.label;
          const value = this.translateService.instant(matchingOption ?? '');

          this.searchForm.get('search')?.setValue(value, { emitEvent: false });
          this.selectedValue.set(value);
        }
      });

    // Create a combined observable of the search form value and the dropdown options
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        combineLatestWith(this.control.options),
        takeUntil(this._unsubscribe)
      )
      .subscribe(([search, options]) => {
        let filteredOptions = options;
        if (!!search) {
          // Filter the options based on the search value
          filteredOptions = options.filter((option) => {
            const translatedOption = this.translateService.instant(
              option.label
            );

            return translatedOption
              .toLowerCase()
              .includes(search.toLowerCase());
          });
        }

        // Update the dropdown options with the filtered options
        this.filteredOptions.set(filteredOptions);
      });
  }

  public handleSelectOption(option: IEsfsDropdownOption<TValue>): void {
    const value = this.translateService.instant(option.label);

    this.searchForm.get('search')?.setValue(value, { emitEvent: false });
    this.selectedValue.set(value);
    this.control.setValue(option.value);
    this.esfsBlur.emit();
    this.esfsChange.emit(option.value);
  }

  public handleSearchInput(): void {
    this.control.setValue(null);
  }

  handleBlur(): void {
    this.esfsBlur.emit();

    const searchField = this.searchForm.get('search');

    if (searchField?.dirty || searchField?.touched) {
      this.control.markAsDirty();
      this.control.markAsTouched();
    }
  }
}
