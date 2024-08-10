import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() action?: () => Promise<void> | void;

  @ViewChild('confirmModal') confirmModal!: ElementRef<HTMLDialogElement>;

  async onClick() {
    if (this.action) {
      try {
        await this.action(); // Await if it's a Promise
        this.confirmModal.nativeElement.close(); // Close the modal after action
      } catch (error) {
        console.error(error);
      }
    }
  }
}