import { Injectable, signal } from '@angular/core';
import { Provider } from '../models/provider.model';
import { QuizAnswers } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  readonly steps = ['concept', 'provider', 'create', 'callback', 'explore'];
  readonly currentStep = signal<number>(0);
  readonly selectedProvider = signal<Provider | null>(null);
  readonly quizAnswers = signal<QuizAnswers | null>(null);
  readonly desiredPodName = signal<string>('');

  stepIndex(path: string): number {
    return this.steps.indexOf(path);
  }
}
