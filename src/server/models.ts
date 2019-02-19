export interface Order {
  id: string;
  customer_id: string;
  driver_id: string;
  restaurant_id: string;
  checkout_time: number; // timestamp
  eta: number; // timestamp
  price: number;
  item_ids: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  owner_id: string;
}

export interface Item {
  id: string;
  price: number;
  name: string;
  prep_time: string;
  description: string;
  picture: string;
  restaurant_id: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
}

export interface Customer extends Account {
  type: 'customer';
  order_ids: string[];
}

export interface Driver extends Account {
  type: 'driver';
  order_ids: string[];
}

export interface Owner extends Account {
  type: 'owner';
  restaurant_ids: string[];
}