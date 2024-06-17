import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  form: FormGroup;
  groups: string[] = ['Admin', 'User', 'Guest'];
  departments: string[] = ['HR', 'Engineering', 'Marketing'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      group: ['', Validators.required],
      department: [''],
    });

    this.form.get('email')!.valueChanges.subscribe((value) => {
      this.form.get('username')!.setValue(value);
    });
    this.form.get('group')!.valueChanges.subscribe((value) => {
      this.updateDepartmentField(value);
    });
  }

  updateDepartmentField(group: string) {
    const departmentControl: any = this.form.get('department');
    if (group === 'User') {
      departmentControl.setValidators([Validators.required]);
      departmentControl.updateValueAndValidity();
    } else {
      departmentControl.clearValidators();
      departmentControl.updateValueAndValidity();
      departmentControl.reset();
    }
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
