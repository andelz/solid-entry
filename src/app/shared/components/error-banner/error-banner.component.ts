import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.css',
})
export class ErrorBannerComponent {
  errorService = inject(ErrorService);
}
