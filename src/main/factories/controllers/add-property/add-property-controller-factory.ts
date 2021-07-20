import AddPropertyController from '../../../../presentation/controllers/property/add-property/add-property-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAddProperty } from '../../usecases/add-property/db-add-property-factory';
import { makeAddPropertyValidation } from './add-property-validation-factory';

export const makeAddPropertyController = (): Controller => {
  const controller = new AddPropertyController(makeAddPropertyValidation(), makeDbAddProperty());
  return makeLogControllerDecorator(controller);
};
