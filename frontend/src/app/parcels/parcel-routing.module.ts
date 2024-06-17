import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelsComponent } from './pages/parcels/parcels.component';
import { ImportParcelsComponent } from './pages/import-parcels/import-parcels.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: '', component: ParcelsComponent },
  { path: 'import', component: ImportParcelsComponent },
  { path: ':id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelsRoutingModule {}
