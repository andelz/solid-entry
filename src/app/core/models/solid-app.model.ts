export interface DataPermission {
  container: string;
  description: string;
  access: 'read' | 'write' | 'read/write';
}

export interface SolidApp {
  id: string;
  name: string;
  tagline: string;
  url: string;
  logoUrl: string;
  category: string;
  dataAccess: DataPermission[];
  openSource: boolean;
  status: 'stable' | 'beta' | 'experimental';
}
