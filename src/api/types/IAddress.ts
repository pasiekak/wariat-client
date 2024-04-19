export interface IAddress {
  id: number;
  country: string | null;
  city: string | null;
  street: string | null;
  homeNumber: number | null;
  postalCode: string | null;
  UserId: number | null;
}

export interface IAddressForOrder {
  country: string;
  city: string;
  street: string;
  homeNumber: number;
  postalCode: string;
}
