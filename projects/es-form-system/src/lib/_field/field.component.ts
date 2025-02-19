import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { EsfsFormControl, EsfsFormGroup } from '../_common';
import { EsfsFormErrorPipe } from '../_common/error.pipe';

@Component({
  selector: 'esfs-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, EsfsFormErrorPipe],
})
export class EsfsFieldComponent<TValue> implements OnInit {
  @Input({ required: true })
  name!: string;

  public control!: EsfsFormControl<TValue>;
  public form!: EsfsFormGroup;

  @Output() public esfsBlur: EventEmitter<void> = new EventEmitter<void>();
  @Output() public esfsChange: EventEmitter<TValue | null> =
    new EventEmitter<TValue | null>();

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
