import { Component, signal, computed } from '@angular/core';
import { SOLID_APPS, APP_CATEGORIES } from '../../core/data/apps-registry.data';
import { AppCardComponent } from './app-card/app-card.component';

@Component({
  selector: 'app-app-gallery',
  imports: [AppCardComponent],
  templateUrl: './app-gallery.component.html',
  styleUrl: './app-gallery.component.css',
})
export class AppGalleryComponent {
  readonly categories = APP_CATEGORIES;
  activeCategory = signal('All');

  filtered = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? SOLID_APPS : SOLID_APPS.filter(a => a.category === cat);
  });
}
