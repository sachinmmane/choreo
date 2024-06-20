import {
  AfterContentInit,
  Component,
  Input,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToasterService } from '../../../services/toastr.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  router = inject(Router);
  userGroup: any;
  sidenavCollapsed = signal(false);
  user: any;
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  menuItemsList: MenuItem[] = [
    { icon: 'inventory_2', label: 'Parcels', route: '/parcels' },
    { icon: 'download', label: 'Import Parcels', route: '/parcels/import' },
    { icon: 'groups', label: 'Departments', route: '/department' },
    { icon: 'group', label: 'Users', route: '/users' },
    { icon: 'rule', label: 'Rule Management', route: '/rules' },
  ];

  profilPicSizeHeight = computed(() =>
    this.sidenavCollapsed() ? '32' : '100'
  );
  profilPicSizeWidth = computed(() => (this.sidenavCollapsed() ? '32' : '150'));

  constructor(
    private authService: AuthService,
    private toastrService: ToasterService
  ) {
    this.getUserDetails();
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth');
  }

  getUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (res: any) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          this.user = res;
          console.log('user', this.user);
          this.userGroup = res?.groups[0]?.name;
        }
      },
      (error: Error) => {
        this.toastrService.showError(error.message, 'Failed');
      }
    );
  }
}
