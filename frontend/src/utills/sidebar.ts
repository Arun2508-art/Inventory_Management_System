export const menuItems = [
  {
    // title: 'MENU',
    items: [
      { icon: '/home.svg', label: 'Dashboard', href: '/dashboard' },
      { icon: '/product.svg', label: 'Products', href: '/products' },
      { icon: '/category.svg', label: 'Categories', href: '/categories' },
      {
        icon: '/user.svg',
        label: 'User',
        options: [
          { label: 'Staff', href: '/user/staff' },
          { label: 'Customer', href: '/user/customer' },
          { label: 'Suppliers', href: '/user/suppliers' },
        ],
      },
      { icon: '/warehouse.svg', label: 'Warehouses', href: '/warehouses' },

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
        icon: '/report.svg',
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
