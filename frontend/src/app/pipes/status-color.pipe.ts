import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'RECEIVED_AT_DC':
        return 'received-at-dc';
      case 'WAITING_FOR_APPROVAL':
        return 'waiting-for-approval';
      case 'APPROVED':
        return 'approved';
      case 'DEPARTMENT_ASSIGNED':
        return 'department-assigned';
      case 'SHIPPED_TO_CUSTOMER':
        return 'shipped-to-customer';
      case 'ON_HOLD':
        return 'on-hold';
      case 'COMPLETED':
        return 'completed';
      default:
        return '';
    }
  }
}
