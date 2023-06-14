import { Component } from '@angular/core';
import { ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  title = 'crud';

  displayedColumns: string[] = [
    'id',
    'fistName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialoge: MatDialog,
    private _testService: EmployeeService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }
  openTest() {
    const dialogRef = this._dialoge.open(TestComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._testService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._testService.deleteenmployee(id).subscribe({
      next: (res) => {
        alert('employee deleted');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  editEmployee(data: any) {
    const dialogRef = this._dialoge.open(TestComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  logOut(): void {
    this._authService.logout();
  }
}
