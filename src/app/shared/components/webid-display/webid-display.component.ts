import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-webid-display',
  templateUrl: './webid-display.component.html',
  styleUrl: './webid-display.component.css',
})
export class WebidDisplayComponent {
  webId = input.required<string>();
  copied = signal(false);

  copy(): void {
    navigator.clipboard.writeText(this.webId()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
