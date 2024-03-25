interface SidebarItem {
  title: string;
  path?: string;
  cName: string;
}

export const ClientSidebarData: SidebarItem[] = [
  {
    title: 'Sign in',
    cName: 'nav-text'
  },
  {
    title: 'Sign up',
    cName: 'nav-text'
  },
  {
    title: 'Peripherals',
    path: '/',
    cName: 'nav-text'
  },
  {
    title: 'PC Components',
    path: '/',
    cName: 'nav-text'
  },
  {
    title: 'Under $100',
    path: '/products?price=0-99',
    cName: 'nav-text'
  },
  {
    title: 'CPU',
    path: '/products?cpu=13th_Gen%2012th_Gen%2011th_Gen%2010th_Gen%209th_Gen',
    cName: 'nav-text'
  },
  {
    title: 'Best Sellers',
    path: '/products?sort=Best_Sellers',
    cName: 'nav-text'
  },{
    title: 'Featured',
    path: '/products?sort=Featured',
    cName: 'nav-text'
  },{
    title: 'Newest',
    path: '/products?sort=Newest',
    cName: 'nav-text'
  },{
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