export interface Provider {
  id: string;
  name: string;
  url: string;
  registrationUrl: string;
  oidcIssuer: string;
  description: string;
  selfHosted: boolean;
  customDomain: boolean;
  difficulty: 'easy' | 'medium' | 'advanced';
  tags: string[];
  logoUrl: string;
}
