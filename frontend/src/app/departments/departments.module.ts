import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { MaterialModule } from '../shared/material.module';
import { AddUpdateComponent } from './dialogs/add-update/add-update.component';

@NgModule({
  declarations: [DepartmentsComponent, AddUpdateComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class DepartmentModule {}
