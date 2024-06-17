import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  // { path: 'import', component: ImportParcelsComponent },
  // { path: ':id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
