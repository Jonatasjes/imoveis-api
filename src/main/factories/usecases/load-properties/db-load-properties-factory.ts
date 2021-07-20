import { DbLoadProperties } from '../../../../dataLayer/usecases/load-properties/db-load-properties';
import { LoadProperties } from '../../../../domain/usecases/load-properties';
import { PropertyMongoRepository } from '../../../../infra/db/mongodb/property/property-mongo-repository';

export const makeDbLoadProperties = (): LoadProperties => {
  const propertyMongoRepository = new PropertyMongoRepository();
  return new DbLoadProperties(propertyMongoRepository);
};
