
export type Store = {
  _id: string;
  id: string;
  user: string;
  storeName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  deliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageFile: string;
  lastUpdated: string;
};




export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  id: string;
  user: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  store: Store;
  totalAmount: number;
};