export const menuItems = [
  {
    // title: 'MENU',
    items: [
      { icon: '/home.svg', label: 'Dashboard', href: '/dashboard' },
      { icon: '/home.svg', label: 'Products', href: '/products' },
      { icon: '/home.svg', label: 'Categories', href: '/categories' },
      { icon: '/user.svg', label: 'User', href: '/user' },
      { icon: '/home.svg', label: 'Stock Levels', href: '/stock-levels' },
      { icon: '/home.svg', label: 'Warehouses', href: '/warehouses' },
      { icon: '/home.svg', label: 'Suppliers', href: '/suppliers' },
      {
        icon: '/home.svg',
        label: 'Purchase Orders',
        href: '/purchase-orders',
      },
      { icon: '/home.svg', label: 'Sales Orders', href: '/sales-orders' },
      {
        icon: '/home.svg',
        label: 'Stock Transactions',
        href: '/stock-transactions',
      },
      {
        icon: '/home.svg',
        label: 'Reports',
        options: [
          { label: 'Inventory', href: '/reports/inventory' },
          { label: 'Sales', href: '/reports/sales' },
          { label: 'Purchases', href: '/reports/purchases' },
        ],
      },
    ],
  },
];
