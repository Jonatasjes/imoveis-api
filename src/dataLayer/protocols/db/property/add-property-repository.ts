import { AddPropertyModel } from '../../../../domain/usecases/add-property';

export interface AddPropertyRepository {
  add(repositoryData: AddPropertyModel): Promise<void>;
}
