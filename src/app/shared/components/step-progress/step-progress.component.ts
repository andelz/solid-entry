import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-step-progress',
  imports: [NgClass],
  templateUrl: './step-progress.component.html',
  styleUrl: './step-progress.component.css',
})
export class StepProgressComponent {
  steps = input.required<string[]>();
  currentStep = input.required<number>();

  stepsList = computed(() =>
    this.steps().map((label, i) => ({
      label,
      index: i,
      done: i < this.currentStep(),
      active: i === this.currentStep(),
    }))
  );
}
