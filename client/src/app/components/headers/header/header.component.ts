import { Component, Input, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() text: string = ''

  dateVal: Date = new Date()
}
