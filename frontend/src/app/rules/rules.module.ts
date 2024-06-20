import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './pages/rules/rules.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';

@NgModule({
  declarations: [RulesComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    RulesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RulesModule {}
