
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
  _id: string;
  name: string;
  price: number;
};