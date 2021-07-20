import {
  LoadProperties,
  LoadPropertiesRepository,
  PropertyModel,
} from './db-add-properties-protocols';

export class DbLoadProperties implements LoadProperties {
  constructor(private readonly loadPropertiesRepository: LoadPropertiesRepository) {}
  async load(query?: any): Promise<PropertyModel[]> {
    const queryObj = query || '';
    const propeties = await this.loadPropertiesRepository.loadAll(queryObj);
    return propeties;
  }
}
