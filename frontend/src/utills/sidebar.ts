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
      { icon: '/file-invoice.svg', label: 'Billing', href: '/billing' },
      { icon: '/warehouse.svg', label: 'Warehouses', href: '/warehouses' },
      {
        icon: '/report.svg',
        label: 'Orders',
        options: [
          { label: 'Sales Orders', href: '/order/sales' },
          { label: 'Purchase Orders', href: '/order/purchase' },
        ],
      },
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
