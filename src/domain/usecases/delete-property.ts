import { PropertyModel } from '../models/property';

export interface DeleteProperty {
  delete(id: string): Promise<void>;
}
