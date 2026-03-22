import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  message = input.required<string>();
  confirmLabel = input('Delete');
  confirmed = output<void>();
  cancelled = output<void>();
}
