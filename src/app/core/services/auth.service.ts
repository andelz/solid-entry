import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  login,
  logout,
  handleIncomingRedirect,
  getDefaultSession,
  ISessionInfo,
} from '@inrupt/solid-client-authn-browser';
import { getPodUrlAll } from '@inrupt/solid-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal<boolean>(false);
  readonly webId = signal<string | null>(null);
  readonly podUrl = signal<string | null>(null);
  readonly name = signal<string | null>(null);
  private _sessionFetch: typeof fetch = fetch;

  get sessionFetch(): typeof fetch {
    return this._sessionFetch;
  }

  async initialize(): Promise<void> {
    await handleIncomingRedirect({ restorePreviousSession: true });
    const session = getDefaultSession();
    this._applySession(session.info);
    if (session.fetch) {
      this._sessionFetch = session.fetch;
    }
  }

  async loginWithProvider(oidcIssuer: string, redirectPath = '/onboarding/callback'): Promise<void> {
    const loginParams: Parameters<typeof login>[0] = {
      oidcIssuer,
      redirectUrl: `${environment.appOrigin}${redirectPath}`,
      clientName: 'Solid Onboarding',
    };
    loginParams.clientId = environment.clientIdUrl;
    await login(loginParams);
  }

  async logout(): Promise<void> {
    await logout();
    this.isLoggedIn.set(false);
    this.webId.set(null);
    this.podUrl.set(null);
    this.name.set(null);
  }

  private async _applySession(info: ISessionInfo): Promise<void> {
    if (info.isLoggedIn && info.webId) {
      this.isLoggedIn.set(true);
      this.webId.set(info.webId);
      try {
        const session = getDefaultSession();
        const podUrls = await getPodUrlAll(info.webId, { fetch: session.fetch });
        this.podUrl.set(podUrls[0] ?? null);
      } catch {
        // Fallback: derive from WebID convention
        this.podUrl.set(info.webId.replace('/profile/card#me', '/'));
      }
    }
  }
}
