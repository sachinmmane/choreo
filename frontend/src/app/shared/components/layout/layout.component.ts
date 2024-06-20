import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  loading: boolean = true;
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '300px'));
  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.loaderService.getLoadingStatus().subscribe((status: boolean) => {
      this.ngZone.run(() => {
        this.loading = status;
        this.cdr.detectChanges();
      });
    });
  }
}
