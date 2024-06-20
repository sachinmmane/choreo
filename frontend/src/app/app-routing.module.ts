import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { reverseAuthGuard } from './guard/revers-auth.guard';
import { roleGuard } from './guard/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [reverseAuthGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'department',
        loadChildren: () =>
          import('./departments/departments.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
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
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
