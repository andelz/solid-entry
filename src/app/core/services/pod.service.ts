import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  getSolidDataset,
  getContainedResourceUrlAll,
  deleteFile,
  createContainerAt,
  overwriteFile,
  getResourceInfoWithAcl,
  hasResourceAcl,
  getPublicAccess,
} from '@inrupt/solid-client';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

export interface ResourceInfo {
  url: string;
  name: string;
  isContainer: boolean;
  contentType?: string;
}

@Injectable({ providedIn: 'root' })
export class PodService {
  private auth = inject(AuthService);
  private errorService = inject(ErrorService);

  listContainer(url: string): Observable<ResourceInfo[]> {
    return from(this._listContainer(url));
  }

  private async _listContainer(url: string): Promise<ResourceInfo[]> {
    const dataset = await getSolidDataset(url, { fetch: this.auth.sessionFetch });
    const urls = getContainedResourceUrlAll(dataset);
    return urls
      .filter(u => !u.endsWith('.acl') && !u.endsWith('.meta'))
      .map(u => ({
        url: u,
        name: this._resourceName(u),
        isContainer: u.endsWith('/'),
      }));
  }

  deleteResource(url: string): Observable<void> {
    return from(
      deleteFile(url, { fetch: this.auth.sessionFetch }).then(() => undefined).catch(err => { this.errorService.handle(err); })
    );
  }

  createContainer(url: string): Observable<void> {
    return from(
      createContainerAt(url, { fetch: this.auth.sessionFetch }).then(() => undefined).catch(err => { this.errorService.handle(err); })
    );
  }

  uploadFile(containerUrl: string, file: File): Observable<void> {
    const targetUrl = `${containerUrl.replace(/\/$/, '')}/${file.name}`;
    return from(
      overwriteFile(targetUrl, file, { contentType: file.type || 'application/octet-stream', fetch: this.auth.sessionFetch })
        .then(() => undefined)
        .catch(err => { this.errorService.handle(err); })
    );
  }

  getPermissions(url: string): Observable<'public' | 'private' | 'shared'> {
    return from(this._getPermissions(url));
  }

  private async _getPermissions(url: string): Promise<'public' | 'private' | 'shared'> {
    try {
      const resourceWithAcl = await getResourceInfoWithAcl(url, { fetch: this.auth.sessionFetch });
      if (!hasResourceAcl(resourceWithAcl)) return 'private';
      const publicAccess = getPublicAccess(resourceWithAcl);
      if (publicAccess?.read) return 'public';
      return 'shared';
    } catch {
      return 'private';
    }
  }

  private _resourceName(url: string): string {
    const clean = url.replace(/\/$/, '');
    return clean.split('/').pop() ?? url;
  }
}
