import {
  AddProperty,
  AddPropertyModel,
  HttpRequest,
  Validation,
} from './add-property-controller-protocols';

import AddPropertyController from './add-property-controller';
import { badRequest, noContent, serverError } from '../../../helpers/http-helper';

import MockDate from 'mockdate';

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      publication_date: new Date(),
      title: 'any_title',
      description: 'any_description',
      value: 'any_value',
      area: 'any_area',
      address: 'any_address',
      public_place: 'any_public_place',
      number: 'any_number',
      adjunct: 'any_adjunct',
      neighborhood: 'any_neighborhood',
      zip_code: 'any_zip_code',
      city: 'any_city',
      state: 'any_state',
    },
  };
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeAddProperty = (): AddProperty => {
  class AddPropertyStub implements AddProperty {
    async add(data: AddPropertyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }

  return new AddPropertyStub();
};

interface SutTypes {
  sut: AddPropertyController;
  validationStub: Validation;
  addPropertyStub: AddProperty;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const addPropertyStub = makeAddProperty();
  const sut = new AddPropertyController(validationStub, addPropertyStub);
  return {
    sut,
    validationStub,
    addPropertyStub,
  };
};

describe('AddProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call AddProperty with correct values', async () => {
    const { sut, addPropertyStub } = makeSut();
    const addSpy = jest.spyOn(addPropertyStub, 'add');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 500 if AddProperty throws', async () => {
    const { sut, addPropertyStub } = makeSut();
    jest
      .spyOn(addPropertyStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
