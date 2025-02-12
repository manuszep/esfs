import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EsfsFieldComponentBase } from '../_common/field.component';

import {
  EsfsFormControlAddress,
  IEsfsFormControlAddressValue,
} from './address.model';
import { TranslateModule } from '@ngx-translate/core';
import { EsfsFieldComponent } from '../_field';
import { EsfsFormGroupDirective } from '../_common';
import { EsfsTextComponent } from '../text';
import { EsfsNumberComponent } from '../number';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EsfsAddressComponent extends EsfsFieldComponentBase<
  IEsfsFormControlAddressValue,
  EsfsFormControlAddress
> {}
