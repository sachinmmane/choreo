import { Component } from '@angular/core';
import { ParcelsService } from '../../../services/parcels.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../services/toastr.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  statusList: any[] = [];
  constructor(
    private parcelsService: ParcelsService,
    private route: ActivatedRoute,
    private toastService: ToasterService
  ) {
    this.getParcelById();
    this.getStatus();
  }
  parcel!: any;

  getParcelById() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.parcelsService.getParcelById(id).subscribe(
      (data) => {
        this.parcel = data;
      },
      (error: Error) => {
        this.toastService.showError(error.message, 'Failed, ');
      }
    );
  }

  onStatusChange(event: any) {
    const id: any = this.route.snapshot.paramMap.get('id');
    let statusId = event.value.id;
    this.parcelsService.updateParcelStatus(id, statusId).subscribe(
      (response) => {
        this.getParcelById();
        this.toastService.showSuccess(
          'Parcel status updated successfully',
          'Success, '
        );
      },
      (error: Error) => {
        this.toastService.showError(error.message, 'Failed, ');
      }
    );
  }

  getStatus(): void {
    this.parcelsService.getStatus().subscribe(
      (data: any[]) => {
        this.statusList = data;
      },
      (error: Error) => {
        this.toastService.showError(error.message, 'Failed, ');
      }
    );
  }

  compareStatus(s1: any, s2: any): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }
}
