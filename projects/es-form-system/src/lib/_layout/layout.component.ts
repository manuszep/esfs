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
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class EsfsLayoutComponent {
  @Input() id?: string;
  @Input() label?: string;
  @Input() iconBefore?: string;
  @Input() iconAfter?: string;
  @Input() textBefore?: string;
  @Input() textAfter?: string;
  @Input() disabled = false;
  @Input() hasError = false;
}
