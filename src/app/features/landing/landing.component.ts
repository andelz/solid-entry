import { Component, inject, AfterViewInit, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { OnboardingService } from '../../core/services/onboarding.service';
import { PROVIDERS } from '../../core/data/providers.data';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements AfterViewInit {
  auth = inject(AuthService);
  private onboarding = inject(OnboardingService);

  @ViewChildren('panel') panels!: QueryList<ElementRef>;

  showLoginPicker = signal(false);
  customIssuer = signal('');

  readonly knownProviders = PROVIDERS.filter(p => !p.selfHosted);

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    this.panels.forEach(p => observer.observe(p.nativeElement));
  }

  toggleLoginPicker(): void {
    this.showLoginPicker.update(v => !v);
    this.customIssuer.set('');
  }

  loginWithProvider(oidcIssuer: string): void {
    this.auth.loginWithProvider(oidcIssuer);
  }

  loginCustom(): void {
    const raw = this.customIssuer().trim();
    if (!raw) return;
    const url = raw.startsWith('http') ? raw : `https://${raw}`;
    try {
      const issuer = new URL(url).origin;
      this.auth.loginWithProvider(issuer);
    } catch {
      // invalid URL — ignore
    }
  }
}
