import { DbAddProperty } from '../../../../dataLayer/usecases/add-property/db-add-property';
import { AddProperty } from '../../../../domain/usecases/add-property';
import { PropertyMongoRepository } from '../../../../infra/db/mongodb/property/property-mongo-repository';

export const makeDbAddProperty = (): AddProperty => {
  const propertyMongoRepository = new PropertyMongoRepository();
  return new DbAddProperty(propertyMongoRepository);
};
