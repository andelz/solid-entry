import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OnboardingService } from '../../core/services/onboarding.service';
import { StepProgressComponent } from '../../shared/components/step-progress/step-progress.component';

const STEP_LABELS = ['What is a Pod?', 'Choose Provider', 'Create Pod', 'Connect', 'Done!'];

@Component({
  selector: 'app-onboarding',
  imports: [RouterOutlet, StepProgressComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent implements OnInit {
  onboarding = inject(OnboardingService);
  private router = inject(Router);

  readonly stepLabels = STEP_LABELS;

  ngOnInit(): void {
    this._syncStep();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this._syncStep());
  }

  private _syncStep(): void {
    const segment = this.router.url.split('/').pop()?.split('?')[0] ?? '';
    const idx = this.onboarding.stepIndex(segment);
    if (idx >= 0) this.onboarding.currentStep.set(idx);
  }
}
