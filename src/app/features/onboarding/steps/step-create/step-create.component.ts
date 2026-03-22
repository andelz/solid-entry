import { Component, inject, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnboardingService } from '../../../../core/services/onboarding.service';

@Component({
  selector: 'app-step-create',
  imports: [FormsModule, RouterLink],
  templateUrl: './step-create.component.html',
  styleUrl: './step-create.component.css',
})
export class StepCreateComponent {
  onboarding = inject(OnboardingService);
  private router = inject(Router);

  podName = signal('');

  previewUrl = computed(() => {
    const provider = this.onboarding.selectedProvider();
    if (!provider || provider.selfHosted) return null;
    const name = this.podName() || 'yourname';
    const host = new URL(provider.oidcIssuer).hostname;
    return `https://${name}.${host}/`;
  });

  openRegistration(): void {
    const provider = this.onboarding.selectedProvider();
    if (!provider) return;
    this.onboarding.desiredPodName.set(this.podName());
    window.open(provider.registrationUrl, '_blank', 'noopener');
  }

  continue(): void {
    this.router.navigate(['/onboarding/callback']);
  }

  back(): void {
    this.router.navigate(['/onboarding/provider']);
  }
}
