import { LoadProperty, LoadPropertyRepository, PropertyModel } from './db-load-property-protocols';

export class DbLoadProperty implements LoadProperty {
  constructor(private readonly loadPropertyRepository: LoadPropertyRepository) {}
  async load(id: string): Promise<PropertyModel> {
    const propeties = await this.loadPropertyRepository.loadOne(id);
    return propeties;
  }
}
