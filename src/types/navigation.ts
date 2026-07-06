export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}
