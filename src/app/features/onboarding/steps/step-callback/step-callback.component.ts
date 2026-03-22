import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { WebidDisplayComponent } from '../../../../shared/components/webid-display/webid-display.component';

@Component({
  selector: 'app-step-callback',
  imports: [WebidDisplayComponent],
  templateUrl: './step-callback.component.html',
  styleUrl: './step-callback.component.css',
})
export class StepCallbackComponent implements OnInit {
  auth = inject(AuthService);
  private onboarding = inject(OnboardingService);
  private router = inject(Router);

  checking = signal(true);

  displayName = computed(() => {
    const id = this.auth.webId();
    if (!id) return 'there';
    return id.replace(/^https?:\/\//, '').split('/')[0];
  });

  ngOnInit(): void {
    // APP_INITIALIZER already called handleIncomingRedirect — just read the settled state
    this.checking.set(false);
  }

  login(): void {
    const provider = this.onboarding.selectedProvider();
    const oidcIssuer = provider?.oidcIssuer ?? 'https://solidcommunity.net';
    this.auth.loginWithProvider(oidcIssuer);
  }

  continue(): void {
    this.router.navigate(['/onboarding/explore']);
  }
}
