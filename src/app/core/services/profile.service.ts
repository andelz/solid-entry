import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrl,
  setStringNoLocale,
  setThing,
  saveSolidDatasetAt,
} from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

export interface Profile {
  webId: string;
  name: string | null;
  bio: string | null;
  photo: string | null;
  website: string | null;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private auth = inject(AuthService);
  private errorService = inject(ErrorService);

  getProfile(webId: string): Observable<Profile> {
    return from(this._getProfile(webId));
  }

  private async _getProfile(webId: string): Promise<Profile> {
    try {
      const profileUrl = webId.split('#')[0];
      const dataset = await getSolidDataset(profileUrl, { fetch: this.auth.sessionFetch });
      const thing = getThing(dataset, webId);
      return {
        webId,
        name: thing ? getStringNoLocale(thing, FOAF.name) : null,
        bio: thing ? getStringNoLocale(thing, 'http://xmlns.com/foaf/0.1/bio') : null,
        photo: thing ? getUrl(thing, 'http://xmlns.com/foaf/0.1/img') : null,
        website: thing ? getUrl(thing, 'http://xmlns.com/foaf/0.1/homepage') : null,
      };
    } catch (err) {
      this.errorService.handle(err);
      return { webId, name: null, bio: null, photo: null, website: null };
    }
  }

  updateProfile(webId: string, updates: Partial<Pick<Profile, 'name' | 'bio'>>): Observable<void> {
    return from(this._updateProfile(webId, updates));
  }

  private async _updateProfile(webId: string, updates: Partial<Pick<Profile, 'name' | 'bio'>>): Promise<void> {
    try {
      const profileUrl = webId.split('#')[0];
      let dataset = await getSolidDataset(profileUrl, { fetch: this.auth.sessionFetch });
      let thing = getThing(dataset, webId);
      if (!thing) return;
      if (updates.name !== undefined) {
        thing = setStringNoLocale(thing, FOAF.name, updates.name ?? '');
      }
      dataset = setThing(dataset, thing);
      await saveSolidDatasetAt(profileUrl, dataset, { fetch: this.auth.sessionFetch });
    } catch (err) {
      this.errorService.handle(err);
    }
  }
}
