export type InpostPoint = {
  name: string;
  position: InpostPosition;
  address_details: InpostAddress_Details;
};

export type InpostPosition = {
  latitude: number;
  longitude: number;
  distance?: number;
};

export type InpostAddress_Details = {
  building_number: number;
  city: string;
  flat_number: number;
  post_code: string;
  province: string;
};
