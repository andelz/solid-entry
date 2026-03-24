import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PodService, ResourceInfo } from '../../../../core/services/pod.service';
import { FileIconPipe } from '../../../../shared/pipes/file-icon.pipe';

@Component({
  selector: 'app-step-explore',
  imports: [RouterLink, FileIconPipe],
  templateUrl: './step-explore.component.html',
  styleUrl: './step-explore.component.css',
})
export class StepExploreComponent implements OnInit {
  auth = inject(AuthService);
  private pod = inject(PodService);

  resources = signal<ResourceInfo[]>([]);
  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {
    const podUrl = this.auth.podUrl();
    if (podUrl) {
      this.pod.listContainer(podUrl).subscribe({
        next: r => {
          this.resources.set(r);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
    } else {
      this.loading.set(false);
    }
  }
}
