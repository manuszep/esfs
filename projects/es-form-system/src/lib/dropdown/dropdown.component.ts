import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatestWith } from 'rxjs';

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
  public availableOptions = signal<IEsfsDropdownOption<TValue>[]>([]);
  public selectedOption = signal<IEsfsDropdownOption<TValue> | null>(null);
  public searchTerm = signal<string>('');
  public displayedOptions = computed(() => {
    return this.searchTerm() === ''
      ? this.availableOptions()
      : this.availableOptions().filter((option: IEsfsDropdownOption<TValue>) =>
          option.label.toLowerCase().includes(this.searchTerm().toLowerCase())
        );
  });

  private defaultCompareOptionsToValue = (
    option: IEsfsDropdownOption<TValue>,
    value: any
  ): boolean => JSON.stringify(option.value) === JSON.stringify(value);

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

  protected override setup(): void {
    super.setup();

    this.control().addValidators(
      esfsValidateDropdown(this.searchControl, this.displayedOptions)
    );

    this.control()
      .options.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((options: IEsfsDropdownOption<TValue>[]) => {
        const filterOptions = (option: IEsfsDropdownOption<TValue>) => {
          return this.control().value !== null &&
            typeof this.control().value !== 'undefined'
            ? (
                this.control().compareOptionsToValue() ??
                this.defaultCompareOptionsToValue
              )(option, this.control().value)
            : false;
        };

        this.availableOptions.set(
          options.filter((option) => !filterOptions(option))
        );
        this.selectedOption.set(options.find(filterOptions) || null);
      });

    this.searchControl.valueChanges
      .pipe(
        combineLatestWith(this.control().options),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([searchTerm]) => {
        this.searchTerm.set(searchTerm ?? '');
      });
  }

  handleSelect(option: IEsfsDropdownOption<TValue>): void {
    this.searchTerm.set('');
    this.selectedOption.set(option);
    this.control().setValue(option.value);
    const blurHandler = this.esfsBlurHandler();
    const changeHandler = this.esfsChangeHandler();

    if (blurHandler) {
      blurHandler();
    } else {
      this.esfsBlur.emit();
    }

    if (changeHandler) {
      changeHandler(option.value);
    } else {
      this.esfsChange.emit(option.value);
    }
  }

  handleClear(): void {
    this.searchTerm.set('');
    this.selectedOption.set(null);
    this.control().setValue(null);

    const handler = this.esfsBlurHandler();
    if (handler) {
      handler();
    } else {
      this.esfsBlur.emit();
    }
  }

  handleBlur(): void {
    const handler = this.esfsBlurHandler();
    if (handler) {
      handler();
    } else {
      this.esfsBlur.emit();
    }

    const searchField = this.searchForm.get('search');

    if (searchField?.dirty || searchField?.touched) {
      this.control().markAsDirty();
      this.control().markAsTouched();
    }
  }
}
