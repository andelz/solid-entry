import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PodService, ResourceInfo } from '../../../core/services/pod.service';
import { AppFolderService } from '../../../core/services/app-folder.service';
import { SolidApp } from '../../../core/models/solid-app.model';
import { WebidDisplayComponent } from '../../../shared/components/webid-display/webid-display.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, WebidDisplayComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  private pod = inject(PodService);
  private appFolder = inject(AppFolderService);

  loading = signal(true);
  itemCount = signal(0);
  connectedApps = signal<SolidApp[]>([]);

  ngOnInit(): void {
    const podUrl = this.auth.podUrl();
    if (podUrl) {
      this.pod.listContainer(podUrl).subscribe({
        next: resources => {
          this.itemCount.set(resources.length);
          this.connectedApps.set(this.appFolder.detectConnectedApps(resources, podUrl));
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    } else {
      this.loading.set(false);
    }
  }
}
