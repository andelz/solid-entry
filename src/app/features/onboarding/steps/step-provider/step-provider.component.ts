import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { PROVIDERS, recommendProvider } from '../../../../core/data/providers.data';
import { QuizAnswers } from '../../../../core/models/quiz.model';
import { Provider } from '../../../../core/models/provider.model';

@Component({
  selector: 'app-step-provider',
  imports: [FormsModule],
  templateUrl: './step-provider.component.html',
  styleUrl: './step-provider.component.css',
})
export class StepProviderComponent {
  private onboarding = inject(OnboardingService);
  private router = inject(Router);

  hosting = signal<'managed' | 'self-host'>('managed');
  customDomain = signal<'no' | 'yes'>('no');
  cli = signal<'no' | 'yes'>('no');

  recommended = signal<Provider | null>(null);
  alternatives = signal<Provider[]>([]);
  showResult = signal(false);

  all = PROVIDERS;

  compute(): void {
    const answers: QuizAnswers = {
      hosting: this.hosting(),
      customDomain: this.customDomain(),
      cli: this.cli(),
    };
    this.onboarding.quizAnswers.set(answers);
    const rec = recommendProvider(answers.hosting, answers.customDomain, answers.cli);
    this.recommended.set(rec);
    this.alternatives.set(PROVIDERS.filter(p => p.id !== rec.id && p.difficulty !== 'advanced').slice(0, 2));
    this.showResult.set(true);
  }

  select(provider: Provider): void {
    this.onboarding.selectedProvider.set(provider);
    this.router.navigate(['/onboarding/create']);
  }

  back(): void {
    this.showResult.set(false);
  }
}
