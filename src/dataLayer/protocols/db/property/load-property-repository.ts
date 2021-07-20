import { PropertyModel } from '../../../../domain/models/property';

export interface LoadPropertyRepository {
  loadOne(id: string): Promise<PropertyModel>;
}
