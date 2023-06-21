export interface IAdress {
  description: string;
  lat: number | null;
  lng: number | null;
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
  adress: IAdress;
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
  user: {
    name: string;
    email: string;
    phone: string;
    adress: string;
  };
  products: IProduct[];
  shop_id: string;
}
