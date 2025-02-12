import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { EsfsFormControl } from '../_common/form-control';
import { EsfsFormGroup } from '../_common';
import { EsfsTextComponent } from '../text';
import { EsfsFormErrorPipe } from '../_common/error.pipe';
import { EsfsCheckboxComponent } from '../checkbox';
import { EsfsNumberComponent } from '../number';
import { EsfsAddressComponent } from '../address/address.component';
import { EsfsDropdownComponent } from '../dropdown';
import { EsfsDateComponent } from '../date';
import { EsfsPhoneComponent } from '../phone';
import { EsfsRadioComponent } from '../radio';

@Component({
  selector: 'esfs-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    EsfsAddressComponent,
    EsfsTextComponent,
    EsfsNumberComponent,
    EsfsCheckboxComponent,
    EsfsDropdownComponent,
    EsfsFormErrorPipe,
    EsfsAddressComponent,
    EsfsDateComponent,
    EsfsPhoneComponent,
    EsfsRadioComponent,
  ],
})
export class EsfsFieldComponent<TValue> implements OnInit {
  @Input({ required: true }) name!: string;

  public control!: EsfsFormControl<TValue>;
  public form!: EsfsFormGroup;

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    // Extract the FormControl from the parent FormGroup. This is required as it contains the field configuration.
    if (this.controlContainer) {
      if (this.name) {
        this.control = this.controlContainer?.control?.get(
          this.name
        ) as EsfsFormControl<TValue>;
        this.form = this.controlContainer.control as EsfsFormGroup;
      } else {
        console.warn(
          'Missing name directive from host element of the component'
        );
      }
    } else {
      console.warn("Can't find parent esfsFormGroup directive");
    }
  }
}
