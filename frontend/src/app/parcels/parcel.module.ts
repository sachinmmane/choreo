import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelsRoutingModule } from './parcel-routing.module';
import { ParcelsComponent } from './pages/parcels/parcels.component';
import { ImportParcelsComponent } from './pages/import-parcels/import-parcels.component';
import { MaterialModule } from '../shared/material.module';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { ReplaceUnderscoresPipe } from '../pipes/replace-underscores.pipe';

import { DetailsComponent } from './pages/details/details.component';
import { StatusColorPipe } from '../pipes/status-color.pipe';

@NgModule({
  declarations: [
    ParcelsComponent,
    ImportParcelsComponent,
    ConfirmationComponent,
    ReplaceUnderscoresPipe,
    StatusColorPipe,
    DetailsComponent,
  ],
  imports: [CommonModule, ParcelsRoutingModule, MaterialModule],
})
export class ParcelsModule {}
