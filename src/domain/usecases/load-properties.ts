import { PropertyModel } from '../models/property';

export interface LoadProperties {
  load(query?: any): Promise<PropertyModel[]>;
}
