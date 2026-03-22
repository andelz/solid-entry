import { Component, input } from '@angular/core';
import { SolidApp } from '../../../core/models/solid-app.model';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.css',
})
export class AppCardComponent {
  app = input.required<SolidApp>();
}
