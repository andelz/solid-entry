import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBannerComponent } from './shared/components/error-banner/error-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
