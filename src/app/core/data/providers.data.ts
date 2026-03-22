import { Provider } from '../models/provider.model';

export const PROVIDERS: Provider[] = [
  {
    id: 'solidcommunity',
    name: 'SolidCommunity.net',
    url: 'https://solidcommunity.net',
    registrationUrl: 'https://solidcommunity.net/register',
    oidcIssuer: 'https://solidcommunity.net',
    description: 'The original community-run Solid server. Free, managed, no setup needed.',
    selfHosted: false,
    customDomain: false,
    difficulty: 'easy',
    tags: ['free', 'managed', 'community'],
    logoUrl: '',
  },
  {
    id: 'use-id',
    name: 'use.id',
    url: 'https://use.id',
    registrationUrl: 'https://use.id',
    oidcIssuer: 'https://use.id',
    description: 'A user-friendly managed Solid pod provider with a clean signup experience.',
    selfHosted: false,
    customDomain: false,
    difficulty: 'easy',
    tags: ['free', 'managed'],
    logoUrl: '',
  },
  {
    id: 'trinpod',
    name: 'TrinPod',
    url: 'https://trinpod.us',
    registrationUrl: 'https://trinpod.us/register',
    oidcIssuer: 'https://trinpod.us',
    description: 'Managed pod hosting with focus on privacy and data ownership.',
    selfHosted: false,
    customDomain: true,
    difficulty: 'easy',
    tags: ['managed', 'privacy'],
    logoUrl: '',
  },
  {
    id: 'redpencil',
    name: 'redpencil.io',
    url: 'https://redpencil.io',
    registrationUrl: 'https://redpencil.io',
    oidcIssuer: 'https://solid.redpencil.io',
    description: 'Self-hosted Solid server for organisations and developers who control their own infrastructure.',
    selfHosted: true,
    customDomain: true,
    difficulty: 'medium',
    tags: ['self-host', 'organisation'],
    logoUrl: '',
  },
  {
    id: 'css',
    name: 'Community Solid Server',
    url: 'https://github.com/CommunitySolidServer/CommunitySolidServer',
    registrationUrl: 'https://github.com/CommunitySolidServer/CommunitySolidServer#getting-started',
    oidcIssuer: 'http://localhost:3000',
    description: 'Run your own Solid server locally or on any Node.js host. Full control, advanced setup.',
    selfHosted: true,
    customDomain: true,
    difficulty: 'advanced',
    tags: ['self-host', 'open-source', 'advanced'],
    logoUrl: '',
  },
];

export function recommendProvider(hosting: string, customDomain: string, cli: string): Provider {
  if (hosting === 'self-host' && cli === 'yes') {
    return PROVIDERS.find(p => p.id === 'css')!;
  }
  if (hosting === 'self-host') {
    return PROVIDERS.find(p => p.id === 'redpencil')!;
  }
  if (customDomain === 'yes') {
    return PROVIDERS.find(p => p.id === 'trinpod')!;
  }
  return PROVIDERS.find(p => p.id === 'solidcommunity')!;
}
