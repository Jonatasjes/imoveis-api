import { PropertyModel, UpdatePropertyModel } from '../../../../domain/models/property';

export interface UpdatePropertyRepository {
  update(updateData: UpdatePropertyModel): Promise<PropertyModel | null>;
}
