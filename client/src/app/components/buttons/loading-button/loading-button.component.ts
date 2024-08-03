import { Component, Input, Output, EventEmitter } from '@angular/core';
import labels from './../../../../Data/Labels/login.json';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
  @Input() loading: boolean = false;
  @Output() clickAction = new EventEmitter<void>();
  btnText: string = labels.btnSubmit;

  handleClick() {
    if (!this.loading) {
      this.clickAction.emit();
    }
  }
}
