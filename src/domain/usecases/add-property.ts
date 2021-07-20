export interface AddPropertyModel {
  publication_date: Date;
  title: string;
  description: string;
  value: number;
  area: string;
  address: string;
  public_place: string;
  number: string;
  adjunct: string;
  neighborhood: string;
  zip_code: string;
  city: string;
  state: string;
}

export interface AddProperty {
  add(data: AddPropertyModel): Promise<void>;
}
