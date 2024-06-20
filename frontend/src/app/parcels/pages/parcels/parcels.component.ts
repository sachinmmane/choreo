import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ParcelsService } from '../../../services/parcels.service';
import { MatPaginator } from '@angular/material/paginator';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrl: './parcels.component.scss',
})
export class ParcelsComponent implements OnInit {
  parcels: any[] = [];
  displayedColumns: string[] = [
    'id',
    'container',
    'shipping',
    'department',
    'receipient',
    'address',
    'weight',
    'value',
    'status',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parcelsService: ParcelsService,
    private loaderService: LoaderService,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.getParcels();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getParcels(): void {
    this.loaderService.show();
    this.parcelsService.getParcels().subscribe(
      (data: any[]) => {
        this.loaderService.hide();
        this.parcels = data;
        this.dataSource = new MatTableDataSource(this.parcels);
        this.dataSource.paginator = this.paginator;
      },
      (error: Error) => {
        this.loaderService.hide();
        console.error('Error fetching departments:', error);
      }
    );
  }
}
