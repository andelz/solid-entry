import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-permission-badge',
  templateUrl: './permission-badge.component.html',
  styleUrl: './permission-badge.component.css',
})
export class PermissionBadgeComponent {
  permission = input.required<'public' | 'private' | 'shared'>();

  config = computed(() => {
    const map = {
      public:  { label: 'Public',  icon: '🌐', cls: 'public' },
      private: { label: 'Private', icon: '🔒', cls: 'private' },
      shared:  { label: 'Shared',  icon: '👥', cls: 'shared' },
    };
    return map[this.permission()];
  });
}
