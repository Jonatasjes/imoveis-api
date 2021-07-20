import { DeletePropertyController } from '../../../../presentation/controllers/property/delete-property/delete-property-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbDeleteProperty } from '../../usecases/delete-property/db-delete-property-factory';

export const makeDeletePropertyController = (): Controller => {
  const controller = new DeletePropertyController(makeDbDeleteProperty());
  return makeLogControllerDecorator(controller);
};
