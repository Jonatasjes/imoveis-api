import { LoadPropertiesController } from '../../../../presentation/controllers/property/load-properties/load-properties-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbLoadProperties } from '../../usecases/load-properties/db-load-properties-factory';

export const makeLoadPropertiesController = (): Controller => {
  const controller = new LoadPropertiesController(makeDbLoadProperties());
  return makeLogControllerDecorator(controller);
};
