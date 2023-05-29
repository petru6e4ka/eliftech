export interface IUser {
  name: string;
  email: string;
  phone: string;
  adress: string;
}

export interface IShop {
  _id: string;
  title: string;
  type: string;
}

export interface IProduct {
  title: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

export interface IOrder {
  user: IUser;
  products: IProduct[];
  shop_id: string;
}
