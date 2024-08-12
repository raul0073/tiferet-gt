import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() action?: () => Promise<void> | void;
  @Input() loading: boolean = false;
  @ViewChild('confirmModal') confirmModal!: ElementRef<HTMLDialogElement>;

  openModal() {
    if (this.confirmModal) {
      this.confirmModal.nativeElement.showModal();
    } else {
      console.error('confirmModal is undefined');
    }
  }

  closeModal() {
    if (this.confirmModal) {
      this.confirmModal.nativeElement.close();
    } else {
      console.error('confirmModal is undefined');
    }
  }

  async onClick() {
    if (this.action) {
      try {
        await this.action();
      } catch (error) {
        console.error('Error during confirmation:', error);
      } finally {
        this.closeModal();
      }
    }
  }
}