import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly error = signal<string | null>(null);

  handle(err: unknown): void {
    const status = (err as any)?.status ?? (err as any)?.statusCode;
    const messages: Record<number, string> = {
      401: 'You need to sign in to access this.',
      403: "You don't have permission to access this resource.",
      404: "This resource doesn't exist in your pod.",
    };
    if (status && messages[status]) {
      this.error.set(messages[status]);
    } else if (err instanceof TypeError) {
      this.error.set("Can't reach your pod right now. Check your connection.");
    } else {
      this.error.set('Something went wrong. Please try again.');
    }
  }

  clear(): void {
    this.error.set(null);
  }
}
