import { PropertyModel } from '../models/property';

export interface LoadProperty {
  load(id: string): Promise<PropertyModel | null>;
}
