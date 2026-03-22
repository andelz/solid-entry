import { Component, inject, OnInit, signal, computed, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PodService, ResourceInfo } from '../../core/services/pod.service';
import { FileCardComponent } from './file-card/file-card.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pod-browser',
  imports: [RouterLink, FileCardComponent, ConfirmDialogComponent],
  templateUrl: './pod-browser.component.html',
  styleUrl: './pod-browser.component.css',
})
export class PodBrowserComponent implements OnInit {
  auth = inject(AuthService);
  private pod = inject(PodService);

  resources = signal<ResourceInfo[]>([]);
  permissions = signal<Record<string, 'public' | 'private' | 'shared'>>({});
  loading = signal(true);
  currentUrl = signal('');
  breadcrumbs = signal<{ label: string; url: string }[]>([]);
  deleteTarget = signal<string | null>(null);

  ngOnInit(): void {
    const podUrl = this.auth.podUrl();
    if (podUrl) this.navigate(podUrl);
  }

  navigate(url: string): void {
    this.loading.set(true);
    this.currentUrl.set(url);
    this._buildBreadcrumbs(url);
    this.pod.listContainer(url).subscribe(resources => {
      this.resources.set(resources);
      this.loading.set(false);
      // Load permissions in background
      resources.forEach(r => {
        this.pod.getPermissions(r.url).subscribe(p => {
          this.permissions.update(prev => ({ ...prev, [r.url]: p }));
        });
      });
    });
  }

  permissionFor(url: string): 'public' | 'private' | 'shared' {
    return this.permissions()[url] ?? 'private';
  }

  confirmDelete(url: string): void {
    this.deleteTarget.set(url);
  }

  doDelete(): void {
    const url = this.deleteTarget();
    if (!url) return;
    this.deleteTarget.set(null);
    this.pod.deleteResource(url).subscribe(() => {
      this.resources.update(r => r.filter(x => x.url !== url));
    });
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  deleteMessage = computed(() => {
    const url = this.deleteTarget();
    if (!url) return '';
    const name = url.split('/').filter(s => s.length > 0).pop() ?? url;
    return `Delete "${name}"? This cannot be undone.`;
  });

  createFolder(): void {
    const name = prompt('Folder name:');
    if (!name) return;
    const newUrl = `${this.currentUrl().replace(/\/$/, '')}/${name}/`;
    this.pod.createContainer(newUrl).subscribe(() => this.navigate(this.currentUrl()));
  }

  uploadFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.pod.uploadFile(this.currentUrl(), file).subscribe(() => this.navigate(this.currentUrl()));
  }

  private _buildBreadcrumbs(url: string): void {
    const podUrl = this.auth.podUrl() ?? '';
    if (!url.startsWith(podUrl)) { this.breadcrumbs.set([]); return; }
    const relative = url.slice(podUrl.length).replace(/\/$/, '');
    const parts = relative ? relative.split('/') : [];
    const crumbs = [{ label: 'Pod root', url: podUrl }];
    let acc = podUrl;
    parts.forEach(p => {
      acc += p + '/';
      crumbs.push({ label: p, url: acc });
    });
    this.breadcrumbs.set(crumbs);
  }
}
