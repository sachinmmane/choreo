import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { AddComponent } from '../dialogs/add/add.component';
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
export class UsersComponent {
  users: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private userService: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  addUser() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.addUser(result).subscribe(() => {
          this.getUsers();
        });
      }
    });
  }
}
