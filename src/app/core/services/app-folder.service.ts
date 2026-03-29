import { Injectable } from '@angular/core';
import { SOLID_APPS } from '../data/apps-registry.data';
import { SolidApp } from '../models/solid-app.model';
import { ResourceInfo } from './pod.service';

@Injectable({ providedIn: 'root' })
export class AppFolderService {
  private folderToApps = new Map<string, SolidApp[]>();

  constructor() {
    for (const app of SOLID_APPS) {
      for (const access of app.dataAccess) {
        if (access.container === '/') continue;
        const key = access.container;
        const existing = this.folderToApps.get(key) ?? [];
        existing.push(app);
        this.folderToApps.set(key, existing);
      }
    }
  }

  getAppsForResource(resourceUrl: string, podRootUrl: string): SolidApp[] {
    const root = podRootUrl.replace(/\/$/, '');
    const relative = resourceUrl.slice(root.length);
    for (const [container, apps] of this.folderToApps) {
      if (relative === container || relative.startsWith(container)) {
        return apps;
      }
    }
    return [];
  }

  detectConnectedApps(resources: ResourceInfo[], podRootUrl: string): SolidApp[] {
    const found = new Set<string>();
    const result: SolidApp[] = [];
    for (const r of resources) {
      const apps = this.getAppsForResource(r.url, podRootUrl);
      for (const app of apps) {
        if (!found.has(app.id)) {
          found.add(app.id);
          result.push(app);
        }
      }
    }
    return result;
  }
}
