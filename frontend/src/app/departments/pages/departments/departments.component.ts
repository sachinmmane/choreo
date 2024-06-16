import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentsService } from '../../../services/departments.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateComponent } from '../../dialogs/add-update/add-update.component';
import { Department } from '../../../models/department.model';
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
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getDepartments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
        this.dataSource = new MatTableDataSource(this.departments);
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  addUpdateDepartment(department?: Department) {
    const dialogRef = this.dialog.open(AddUpdateComponent, {
      width: '400px',
      data: department,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);

        if (result.id) {
          console.log('heer');
          this.departmentService
            .updateDepartment(result.id, result)
            .subscribe(() => {
              this.getDepartments();
            });
        } else {
          this.departmentService.addDepartment(result).subscribe(() => {
            this.getDepartments();
          });
        }
      }
    });
  }
}
