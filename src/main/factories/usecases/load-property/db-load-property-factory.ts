import { DbLoadProperty } from '../../../../dataLayer/usecases/load-property/db-load-property';
import { LoadProperty } from '../../../../domain/usecases/load-property';
import { PropertyMongoRepository } from '../../../../infra/db/mongodb/property/property-mongo-repository';

export const makeDbLoadProperty = (): LoadProperty => {
  const propertyMongoRepository = new PropertyMongoRepository();
  return new DbLoadProperty(propertyMongoRepository);
};
