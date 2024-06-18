import { Component, ElementRef, ViewChild } from '@angular/core';
import { ParcelsService } from '../../../services/parcels.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-import-parcels',
  templateUrl: './import-parcels.component.html',
  styleUrls: ['./import-parcels.component.scss'],
})
export class ImportParcelsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile!: File | null;
  filePreview: string | ArrayBuffer | null = null;
  isUploading = false;
  message!: string;
  error = false;

  constructor(
    private parcelService: ParcelsService,
    public dialog: MatDialog
  ) {}

  onFileSelected(event: Event): void {
    this.error = false;
    this.isUploading = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.previewFile(file);
        this.extractId(file);
      } else {
        this.error = true;
        this.isUploading = false;
        console.error('Invalid file type');
      }
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeFile(): void {
    this.selectedFile = null;
    this.filePreview = null;
  }

  readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(file);
    });
  }

  extractIdFromXML(xml: string): string | null {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const idElement = xmlDoc.getElementsByTagName('Id')[0];
    return idElement ? idElement.textContent : null;
  }

  extractId(file: any): void {
    this.readFileContent(file)
      .then((content) => {
        const id = this.extractIdFromXML(content);
        console.log('Container ID:', id);
        this.checkFileExistence(id);
      })
      .catch((error) => {
        console.error('Error reading file:', error);
      });
  }

  uploadFile(): void {
    if (this.selectedFile) {
      // Uncomment the following lines to make an actual API call
      this.parcelService.onFileUpload(this.selectedFile).subscribe(
        () => {
          this.isUploading = false;
          alert('File uploaded successfully');
          this.removeFile();
        },
        (error: any) => {
          this.isUploading = false;
          console.error('Failed to upload file', error);
        }
      );
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer && dataTransfer.files.length > 0) {
      const file = dataTransfer.files[0];
      if (this.isValidFile(file)) {
        this.selectedFile = file;
        this.previewFile(file);
        this.extractId(file);
      } else {
        console.error('Invalid file type');
      }
    } else {
      console.error('No file dropped or dataTransfer is null');
    }
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private isValidFile(file: File): boolean {
    const allowedExtensions = ['xml'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension ? allowedExtensions.includes(fileExtension) : false;
  }

  checkFileExistence(containerId: any): void {
    this.parcelService.checkContainerIdExists(containerId).subscribe(
      (response: any) => {
        console.log(response);
        if (response.exists) {
          this.openConfirmDialog();
        } else {
          console.log('Here is upload file');
          this.uploadFile();
        }
      },
      (error: any) => {
        console.error('Error checking container ID:', error);
      }
    );
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: {
        message:
          'This container is already imported. Do you want to reimport it?',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isUploading = false;
        this.uploadFile(); // Implement your uploadFile method
      } else {
        this.isUploading = false;
        this.removeFile();
      }
    });
  }
}
