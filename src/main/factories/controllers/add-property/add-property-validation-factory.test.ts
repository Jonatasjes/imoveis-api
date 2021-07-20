import { Validation } from '../../../../presentation/protocols/validation';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../../validation/validators';
import { makeAddPropertyValidation } from './add-property-validation-factory';

jest.mock('../../../../validation/validators/validation-composite');

describe('AddPropertyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPropertyValidation();
    const requiredFields = [
      'publication_date',
      'title',
      'description',
      'value',
      'area',
      'address',
      'public_place',
      'number',
      'adjunct',
      'neighborhood',
      'zip_code',
      'city',
      'state',
    ];
    const validations: Validation[] = [];
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
