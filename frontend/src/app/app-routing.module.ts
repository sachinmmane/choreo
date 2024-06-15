import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'department',
        loadChildren: () =>
          import('./departments/departments.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'parcels',
        loadChildren: () =>
          import('./parcels/parcel.module').then((m) => m.ParcelsModule),
      },
      {
        path: 'rules',
        loadChildren: () =>
          import('./rules/rules.module').then((m) => m.RulesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
