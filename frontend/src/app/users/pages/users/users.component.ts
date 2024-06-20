import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { AddComponent } from '../dialogs/add/add.component';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../services/loader.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'group',
    'department',
    'action',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastService: ToastrService,
    private loaderService: LoaderService
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers(): void {
    this.loaderService.show();
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();

        this.toastService.error(error.message, 'Failed, ');
      }
    );
  }

  addUser() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.addUser(result).subscribe(
          () => {
            this.toastService.success('User created successfully', 'Success, ');
            this.getUsers();
          },
          (error) => {
            this.toastService.error(error.message, 'Failed, ');
          }
        );
      }
    });
  }
}
