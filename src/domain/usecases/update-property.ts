import { PropertyModel, UpdatePropertyModel } from '../models/property';

export interface UpdateProperty {
  update(updateData: UpdatePropertyModel): Promise<PropertyModel | null>;
}
