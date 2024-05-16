export type InpostPoint = {
  name: string;
  position: InpostPosition;
  address_details: InpostAddressDetails;
};

export type InpostPosition = {
  latitude: number;
  longitude: number;
  distance?: number;
};

export type InpostAddressDetails = {
  building_number: number;
  city: string;
  flat_number: number | null;
  post_code: string;
  province: string;
  street: string;
};
