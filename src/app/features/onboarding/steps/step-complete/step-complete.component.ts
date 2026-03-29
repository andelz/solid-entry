import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { WebidDisplayComponent } from '../../../../shared/components/webid-display/webid-display.component';

@Component({
  selector: 'app-step-complete',
  imports: [RouterLink, WebidDisplayComponent],
  templateUrl: './step-complete.component.html',
  styleUrl: './step-complete.component.css',
})
export class StepCompleteComponent {
  auth = inject(AuthService);

  get podHost(): string {
    const podUrl = this.auth.podUrl();
    if (!podUrl) return '';
    try {
      return new URL(podUrl).hostname;
    } catch {
      return podUrl;
    }
  }
}
