interface SidebarItem {
  title: string;
  path?: string;
  cName: string;
}

export const SidebarData: SidebarItem[] = [
  {
    title: 'Peripherals',
    path: '/',
    cName: 'nav-text'
  },
  {
    title: 'Pc Components',
    path: '/',
    cName: 'nav-text'
  },
  {
    title: 'Sign in',
    cName: 'nav-text'
  },
  {
    title: 'Sign up',
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    cName: 'nav-text'
  },
  {
    title: 'About us',
    path: '/about-us',
    cName: 'nav-text'
  }
];