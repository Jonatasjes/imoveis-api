import { PropertyModel } from '../../../../domain/models/property';

export interface LoadPropertiesRepository {
  loadAll(query?: any): Promise<PropertyModel[]>;
}
