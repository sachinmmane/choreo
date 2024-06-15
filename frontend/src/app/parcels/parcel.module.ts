import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsRoutingModule } from './parcel-routing.module';
import { ParcelsComponent } from './pages/parcels/parcels.component';
import { ImportParcelsComponent } from './pages/import-parcels/import-parcels.component';

@NgModule({
  declarations: [ParcelsComponent, ImportParcelsComponent],
  imports: [CommonModule, ParcelsRoutingModule],
})
export class ParcelsModule {}
