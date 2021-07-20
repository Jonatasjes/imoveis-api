import { Validation } from '../../../../presentation/protocols/validation';
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators';

export const makeAddPropertyValidation = (): ValidationComposite => {
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
  return new ValidationComposite(validations);
};
