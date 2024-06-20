import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { MaterialModule } from '../shared/material.module';
import { AddComponent } from './pages/dialogs/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [UsersComponent, AddComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class UsersModule {}
