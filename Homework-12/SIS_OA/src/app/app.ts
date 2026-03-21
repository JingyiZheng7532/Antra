import {
  Component,
  signal,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  AfterContentInit,
} from '@angular/core';
import { TabService } from './services/tab-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('SIS_OA');
}
