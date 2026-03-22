import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService, Profile } from '../../core/services/profile.service';
import { WebidDisplayComponent } from '../../shared/components/webid-display/webid-display.component';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink, WebidDisplayComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder);

  profile = signal<Profile | null>(null);
  loading = signal(true);
  saving = signal(false);
  saved = signal(false);

  form = this.fb.group({
    name: ['', Validators.maxLength(100)],
  });

  ngOnInit(): void {
    const webId = this.auth.webId();
    if (!webId) { this.loading.set(false); return; }
    this.profileService.getProfile(webId).subscribe(p => {
      this.profile.set(p);
      this.form.patchValue({ name: p.name ?? '' });
      this.loading.set(false);
    });
  }

  save(): void {
    const webId = this.auth.webId();
    if (!webId || this.form.invalid) return;
    this.saving.set(true);
    const { name } = this.form.value;
    this.profileService.updateProfile(webId, { name: name ?? '' }).subscribe(() => {
      this.saving.set(false);
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    });
  }
}
