import { DbDeleteProperty } from '../../../../dataLayer/usecases/delete-property/db-delete-property';
import { DeleteProperty } from '../../../../domain/usecases/delete-property';
import { PropertyMongoRepository } from '../../../../infra/db/mongodb/property/property-mongo-repository';

export const makeDbDeleteProperty = (): DeleteProperty => {
  const propertyMongoRepository = new PropertyMongoRepository();
  return new DbDeleteProperty(propertyMongoRepository);
};
