import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./features/onboarding/onboarding.component').then(m => m.OnboardingComponent),
    children: [
      { path: '', redirectTo: 'concept', pathMatch: 'full' },
      { path: 'concept',  loadComponent: () => import('./features/onboarding/steps/step-concept/step-concept.component').then(m => m.StepConceptComponent) },
      { path: 'provider', loadComponent: () => import('./features/onboarding/steps/step-provider/step-provider.component').then(m => m.StepProviderComponent) },
      { path: 'create',   loadComponent: () => import('./features/onboarding/steps/step-create/step-create.component').then(m => m.StepCreateComponent) },
      { path: 'callback', loadComponent: () => import('./features/onboarding/steps/step-callback/step-callback.component').then(m => m.StepCallbackComponent) },
      { path: 'explore',  loadComponent: () => import('./features/onboarding/steps/step-explore/step-explore.component').then(m => m.StepExploreComponent) },
    ],
  },
  {
    path: 'pod',
    loadComponent: () => import('./features/pod-browser/pod-browser.component').then(m => m.PodBrowserComponent),
    canActivate: [authGuard],
  },
  {
    path: 'apps',
    loadComponent: () => import('./features/app-gallery/app-gallery.component').then(m => m.AppGalleryComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
