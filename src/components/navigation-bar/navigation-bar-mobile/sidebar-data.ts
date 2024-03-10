interface SidebarItem {
  title: string;
  path?: string;
  cName: string;
}

export const ClientSidebarData: SidebarItem[] = [
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

export const AdminSidebarData: SidebarItem[] =[
  {
    title: 'Users',
    path: '/admin/users',
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    cName: 'nav-text'
  },
]