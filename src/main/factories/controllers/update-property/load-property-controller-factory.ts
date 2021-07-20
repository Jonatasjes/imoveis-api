import { UpdatePropertyController } from '../../../../presentation/controllers/property/update-property/update-property-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbUpdateProperty } from '../../usecases/update-property/db-update-property-factory';

export const makeUpdatePropertyController = (): Controller => {
  const controller = new UpdatePropertyController(makeDbUpdateProperty());
  return makeLogControllerDecorator(controller);
};
