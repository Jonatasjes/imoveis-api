import {
  PropertyModel,
  UpdateProperty,
  UpdatePropertyModel,
  UpdatePropertyRepository,
} from './db-update-property-protocols';

export class DbUpdateProperty implements UpdateProperty {
  constructor(private readonly loadPropertyRepository: UpdatePropertyRepository) {}
  async update(updateData: UpdatePropertyModel): Promise<PropertyModel | null> {
    const propeties = await this.loadPropertyRepository.update(updateData);
    return propeties;
  }
}
