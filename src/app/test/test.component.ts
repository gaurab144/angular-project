import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  testForm: FormGroup;
  education: string[] = ['SEE', 'Diploma', 'Intermidate', 'Graduate', 'Master'];

  constructor(
    private _fb: FormBuilder,
    private _testservice: EmployeeService,
    private _dialogRef: MatDialogRef<TestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.testForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.testForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.testForm.valid) {
      if (this.data) {
        console.log(this.testForm.value);
        this._testservice
          .updateEmployee(this.data.id, this.testForm.value)
          .subscribe({
            next: (val: any) => {
              alert('employee is UPDATED');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        console.log(this.testForm.value);
        this._testservice.addEmployee(this.testForm.value).subscribe({
          next: (val: any) => {
            alert('employee is added');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
