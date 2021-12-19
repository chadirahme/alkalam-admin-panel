import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../shared/auth.service';
import { Invoice } from '../shared/user';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {

  displayedColumns = ['action','invoiceId', 'invConDesc', 'invTotalUsd'];
  dataSource = new MatTableDataSource<Invoice>();
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;;
  
  invoices: Invoice[] = [];  
  constructor(private authService: AuthService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.authService.getAllInvoices().subscribe(data =>{  
      console.log(data);
      this.invoices = data;  
      this.dataSource = new MatTableDataSource <Invoice > (data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  public openRecord(id: number): void {
    console.log(id);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
