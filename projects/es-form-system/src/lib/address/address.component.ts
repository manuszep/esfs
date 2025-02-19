import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import {
  EsfsFormControlAddressBase,
  IEsfsFormControlAddressValue,
} from './address.model';
import { TranslateModule } from '@ngx-translate/core';
import { EsfsTextComponent } from '../text';
import { EsfsNumberComponent } from '../number';
import { EsfsDropdownComponent } from '../dropdown';
import { EsfsLayoutComponent } from '../_layout/layout.component';

export class EsfsFormControlAddress extends EsfsFormControlAddressBase {
  fieldComponent = EsfsAddressComponent;
}

@Component({
  selector: 'esfs-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    EsfsTextComponent,
    EsfsNumberComponent,
    EsfsDropdownComponent,
    EsfsLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsAddressComponent extends EsfsFieldComponentBase<
  IEsfsFormControlAddressValue,
  EsfsFormControlAddress
> {
  protected override setup(): void {
    super.setup();

    const prefix = `${this.control.keyPrefix()}.${this.name.toUpperCase()}`;

    this.control.street.keyPrefix.set(prefix);
    this.control.number.keyPrefix.set(prefix);
    this.control.city.keyPrefix.set(prefix);
    this.control.zip.keyPrefix.set(prefix);
    this.control.country.keyPrefix.set(prefix);
  }

  handleChange(value: IEsfsFormControlAddressValue): void {
    this.esfsChange.emit(value);
  }
}
