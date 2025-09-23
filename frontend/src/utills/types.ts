export type userRole =
  | 'Admin'
  | 'Manager'
  | 'Staff'
  | 'Warehouse'
  | 'Sales'
  | '';

export interface OnSuccessHandlerProps {
  onSuccess: () => void;
  isOpen: boolean;
}

export type ImageType = {
  name: string;
  url: string;
};

export interface ProductProps {
  _id: string;
  name: string;
  images?: ImageType[];
  sku: string;
  category?: Pick<CategoryProps, '_id' | 'name'> | null;
  price?: number;
  quantity?: number;
  supplier?: Pick<SupplierProps, '_id' | 'name'> | null;
  description?: string;
}

export interface CategoryProps {
  _id: string;
  name: string;
  sku: string;
  image?: ImageType;
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
  image?: ImageType;

  department?: string; // e.g. 'Inventory', 'Sales', 'Logistics'
  status: '' | 'active' | 'inactive' | 'onLeave';
  // Permissions (example)
  // canManageInventory?: boolean;
  // canProcessOrders?: boolean;
  // canManageSuppliers?: boolean;
}

export interface SupplierProps {
  _id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  image?: ImageType;
}

export interface CustomerProps {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  image?: ImageType;
}

export interface warehouseProps {
  _id: string;
  name: string;
  contactPerson: string;
  sku: string;
  location: string;
  status: 'active' | 'inActive';
  description?: string;
}
