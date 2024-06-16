import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsRoutingModule } from './parcel-routing.module';
import { ParcelsComponent } from './pages/parcels/parcels.component';
import { ImportParcelsComponent } from './pages/import-parcels/import-parcels.component';
import { MaterialModule } from '../shared/material.module';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';

@NgModule({
  declarations: [
    ParcelsComponent,
    ImportParcelsComponent,
    ConfirmationComponent,
  ],
  imports: [CommonModule, ParcelsRoutingModule, MaterialModule],
})
export class ParcelsModule {}
