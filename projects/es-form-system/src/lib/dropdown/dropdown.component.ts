import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatestWith, takeUntil } from 'rxjs';

import { EsfsLayoutComponent } from '../_layout/layout.component';
import { EsfsFieldComponentBase } from '../_common/field.component';

import { EsfsFormControlDropdown, IEsfsDropdownOption } from './dropdown.model';
import { EsfsFormControlText } from '../text';
import { EsfsFormGroup } from '../_common';

@Component({
  selector: 'esfs-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  standalone: true,
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

  constructor(protected override readonly _cdRef: ChangeDetectorRef) {
    super(_cdRef);

    this.searchControl = new EsfsFormControlText<string>('', {});
    this.searchForm = new EsfsFormGroup({
      search: this.searchControl,
    });
  }

  public override setup(): void {
    super.setup();

    this.control.options
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((options) => {
        this.filteredOptions.set(options);
        this.searchForm.get('search')?.setValue('', { emitEvent: false });

        if (
          this.control.value !== null &&
          typeof this.control.value !== 'undefined'
        ) {
          const matchingOption = options.find(
            (option) => option.value === this.control.value
          )?.label;
          this.searchForm.get('search')?.setValue(matchingOption ?? '');
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
        this.control.markAsDirty();
        this.control.markAsTouched();
        let filteredOptions = options;
        if (!!search) {
          // Filter the options based on the search value
          filteredOptions = options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Update the dropdown options with the filtered options
        this.filteredOptions.set(filteredOptions);
      });
  }

  public handleSelectOption(option: IEsfsDropdownOption<TValue>): void {
    this.searchForm.get('search')?.setValue(option.label, { emitEvent: false });
    this.control.setValue(option.value);
  }

  public handleSearchInput(): void {
    this.control.setValue(null);
  }
}
