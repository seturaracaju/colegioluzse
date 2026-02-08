
export enum PageView {
  HOME = 'home',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  LEGAL = 'legal'
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ValueItem {
  title: string;
  description: string;
}
