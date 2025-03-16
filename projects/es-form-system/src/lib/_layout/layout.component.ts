import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'esfs-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslateModule],
})
export class EsfsLayoutComponent {
  public hasValue = false;

  @Input() id?: string;
  @Input() canTypeIn = true;
  @Input() label?: string;
  @Input() iconBefore?: string | false;
  @Input() iconAfter?: string | false;
  @Input() textBefore?: string;
  @Input() textAfter?: string;
  @Input() multiFields = false;

  @Input() disabled = false;
  @Input() hasError = false;

  @Input()
  set value(value: unknown) {
    this.hasValue = !!value;
  }
}
