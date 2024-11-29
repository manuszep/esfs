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

import { IESFSFieldConfig } from '../_common/field-config';
import { EsfsFormControl } from '../_common/form-control';
import { EsfsFormGroup } from '../_common';
import { EsfsTextComponent } from '../text';

@Component({
  selector: 'esfs-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, EsfsTextComponent],
})
export class EsfsFieldComponent<
  TValue,
  TConfig extends IESFSFieldConfig = IESFSFieldConfig
> implements OnInit
{
  @Input({ required: false }) config?: TConfig;
  @Input({ required: true }) name!: string;

  public control!: EsfsFormControl<TValue, TConfig>;
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
        ) as EsfsFormControl<TValue, TConfig>;
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
