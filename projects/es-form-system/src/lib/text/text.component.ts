import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EsfsFieldComponent } from '../_common/field.component';

import { EsfsFormControlText } from './text.model';
import { EsfsLayoutComponent } from '../_layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'esfs-text',
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
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
export class EsfsTextComponent<TValue = string> extends EsfsFieldComponent<
  TValue,
  EsfsFormControlText<TValue>
> {}
