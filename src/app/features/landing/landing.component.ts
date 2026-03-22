import { Component, inject, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OnboardingService } from '../../core/services/onboarding.service';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements AfterViewInit {
  auth = inject(AuthService);
  private onboarding = inject(OnboardingService);

  @ViewChildren('panel') panels!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    this.panels.forEach(p => observer.observe(p.nativeElement));
  }

  loginExisting(): void {
    this.auth.loginWithProvider('https://solidcommunity.net');
  }
}
