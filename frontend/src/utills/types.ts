export type userRole =
  | 'admin'
  | 'manager'
  | 'staff'
  | 'warehouse'
  | 'sales'
  | '';

export interface CategoryProps {
  _id: string;
  name: string;
  sku: string;
  description?: string;
}

export interface employeeProps {
  _id: string;
  name: string;
  employeeCode: string;
  email: string;
  role: userRole;
  phone: string;
  address: string;

  department?: string; // e.g. 'Inventory', 'Sales', 'Logistics'
  status?: 'active' | 'inactive' | 'onLeave';
  // Permissions (example)
  canManageInventory?: boolean;
  canProcessOrders?: boolean;
  canManageSuppliers?: boolean;
}

export interface SupplierProps {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface CustomerProps {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}
