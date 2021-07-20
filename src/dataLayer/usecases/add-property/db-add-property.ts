import { AddProperty, AddPropertyModel, AddPropertyRepository } from './db-add-property-protocols';

export class DbAddProperty implements AddProperty {
  constructor(private readonly addPropertyRepository: AddPropertyRepository) {}
  async add(data: AddPropertyModel): Promise<void> {
    await this.addPropertyRepository.add(data);
  }
}
