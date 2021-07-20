export interface PropertyModel {
  _id: string;
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

export interface UpdatePropertyModel {
  id: string;
  body: {
    title?: string;
    description?: string;
    value?: number;
    area?: string;
    address?: string;
    public_place?: string;
    number?: string;
    adjunct?: string;
    neighborhood?: string;
    zip_code?: string;
    city?: string;
    state?: string;
  };
}
