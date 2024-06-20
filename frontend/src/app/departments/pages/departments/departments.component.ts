import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentsService } from '../../../services/departments.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateComponent } from '../../dialogs/add-update/add-update.component';
import { Department } from '../../../models/department.model';
import { ToasterService } from '../../../services/toastr.service';
import { LoaderService } from '../../../services/loader.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource();

  constructor(
    private departmentService: DepartmentsService,
    private dialog: MatDialog,
    private toastService: ToasterService,
    private loaderService: LoaderService
  ) {}
  ngOnInit(): void {
    this.getDepartments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDepartments(): void {
    this.loaderService.show();
    this.departmentService.getDepartments().subscribe(
      (data: any[]) => {
        this.loaderService.hide();
        this.departments = data;
        this.dataSource = new MatTableDataSource(this.departments);
      },
      (error) => {
        this.loaderService.hide();
        this.toastService.showError(error.message, 'Failed');
        console.error('Error fetching departments:', error);
      }
    );
  }

  addUpdateDepartment(department?: Department) {
    const dialogRef = this.dialog.open(AddUpdateComponent, {
      width: '500px',
      data: department,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.id) {
          this.departmentService.updateDepartment(result.id, result).subscribe(
            () => {
              this.getDepartments();
              this.toastService.showSuccess(
                'Department updated successfully',
                'Success, '
              );
            },
            (error) => {
              this.toastService.showError(error.message, 'Failed');
            }
          );
        } else {
          this.departmentService.addDepartment(result).subscribe(
            () => {
              this.toastService.showSuccess(
                'Department created successfully',
                'Success, '
              );
              this.getDepartments();
            },
            (error) => {
              this.toastService.showError(error.message, 'Failed');
            }
          );
        }
      }
    });
  }
}
