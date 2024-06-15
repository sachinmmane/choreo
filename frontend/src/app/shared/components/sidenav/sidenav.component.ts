import { Component, Input, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

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
  sidenavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  menuItemsList: MenuItem[] = [
    { icon: 'inventory_2', label: 'Parcels', route: '/parcels' },
    { icon: 'download', label: 'Import Parcels', route: '/parcels/import' },
    { icon: 'groups', label: 'Departments', route: '/department' },
    { icon: 'rule', label: 'Rule Management', route: '/rules' },
  ];

  profilPicSizeHeight = computed(() =>
    this.sidenavCollapsed() ? '32' : '100'
  );
  profilPicSizeWidth = computed(() => (this.sidenavCollapsed() ? '32' : '150'));

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
