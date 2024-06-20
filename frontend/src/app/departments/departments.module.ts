import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { MaterialModule } from '../shared/material.module';
import { AddUpdateComponent } from './dialogs/add-update/add-update.component';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [DepartmentsComponent, AddUpdateComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class DepartmentModule {}
