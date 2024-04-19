export interface ICompanyData {
  id: number;
  nip: string | null;
  companyName: string | null;
  city: string | null;
  street: string | null;
  buildingNumber: number | null;
  postalCode: string | null;
  country: string | null;
  UserId: number | null;
}

export interface ICompanyDataForOrder {
  nip: string;
  companyName: string;
  city: string;
  street: string;
  buildingNumber: number;
  postalCode: string;
  country: string;
}
