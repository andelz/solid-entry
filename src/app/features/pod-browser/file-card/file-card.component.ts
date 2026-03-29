import { Component, input, output } from '@angular/core';
import { ResourceInfo } from '../../../core/services/pod.service';
import { SolidApp } from '../../../core/models/solid-app.model';
import { FileIconPipe } from '../../../shared/pipes/file-icon.pipe';
import { PermissionBadgeComponent } from '../../../shared/components/permission-badge/permission-badge.component';

@Component({
  selector: 'app-file-card',
  imports: [FileIconPipe, PermissionBadgeComponent],
  templateUrl: './file-card.component.html',
  styleUrl: './file-card.component.css',
})
export class FileCardComponent {
  resource = input.required<ResourceInfo>();
  permission = input<'public' | 'private' | 'shared'>('private');
  associatedApps = input<SolidApp[]>([]);
  navigate = output<string>();
  delete = output<string>();
}
