import { DbUpdateProperty } from '../../../../dataLayer/usecases/update-property/db-update-property';
import { UpdateProperty } from '../../../../domain/usecases/update-property';
import { PropertyMongoRepository } from '../../../../infra/db/mongodb/property/property-mongo-repository';

export const makeDbUpdateProperty = (): UpdateProperty => {
  const propertyMongoRepository = new PropertyMongoRepository();
  return new DbUpdateProperty(propertyMongoRepository);
};
