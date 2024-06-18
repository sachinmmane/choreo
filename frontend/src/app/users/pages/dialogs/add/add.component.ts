import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { DepartmentsService } from '../../../../services/departments.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  form: FormGroup;
  groupListing: any[] = [];
  departments: any[] = [];
  constructor(
    private userService: UserService,
    private departmentsService: DepartmentsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getUserGroups();
    this.getDepartments();

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      groups: [[], Validators.required],
      user_department: [''],
      is_active: [true, Validators.required],
    });

    this.form.get('email')!.valueChanges.subscribe((value) => {
      this.form.get('username')!.setValue(value);
    });
    this.form.get('groups')!.valueChanges.subscribe((value) => {
      this.updateDepartmentField(value);
    });
  }

  getUserGroups(): void {
    this.userService.getUserGroups().subscribe(
      (data: any[]) => {
        this.groupListing = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  getDepartments(): void {
    this.departmentsService.getDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
        console.log(this.departments);
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  updateDepartmentField(group: any) {
    const departmentControl: any = this.form.get('user_department');
    if (group.name === 'Department Employee') {
      departmentControl.setValidators([Validators.required]);
      departmentControl.updateValueAndValidity();
    } else {
      departmentControl.clearValidators();
      departmentControl.updateValueAndValidity();
      departmentControl.reset();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let user = this.transformUserGroup(this.form.value);
      this.dialogRef.close(user);
    }
  }

  transformUserGroup(user: any): any {
    let transformedUser: any = {
      ...user,
      groups: [user.groups.id],
      user_department: [
        {
          department_id: user.user_department?.id,
        },
      ],
    };
    if (!transformedUser.user_department[0].department_id) {
      delete transformedUser.user_department;
    }
    return transformedUser;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
