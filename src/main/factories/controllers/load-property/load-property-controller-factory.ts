import { LoadPropertyController } from '../../../../presentation/controllers/property/load-property/load-property-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbLoadProperty } from '../../usecases/load-property/db-load-property-factory';

export const makeLoadPropertyController = (): Controller => {
  const controller = new LoadPropertyController(makeDbLoadProperty());
  return makeLogControllerDecorator(controller);
};
