import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-explorer-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './explorer-shell.component.html',
  styleUrl: './explorer-shell.component.css',
})
export class ExplorerShellComponent {
  auth = inject(AuthService);

  get displayName(): string {
    return this.auth.name() ?? 'My Pod';
  }

  get shortWebId(): string {
    const webId = this.auth.webId();
    if (!webId) return '';
    try {
      const url = new URL(webId);
      return url.hostname;
    } catch {
      return webId;
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
