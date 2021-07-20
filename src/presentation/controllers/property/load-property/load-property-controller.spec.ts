import {
  LoadProperty,
  PropertyModel,
} from './load-property-controller-protocols';

import MockDate from 'mockdate';
import {
  noContent,
  notFound,
  ok,
  serverError,
} from '../../../helpers/http-helper';
import { LoadPropertyController } from './load-property-controller';

const makeFakeProperty = (): PropertyModel => {
  return {
    _id: 'any_id',
    publication_date: new Date(),
    title: 'any_title',
    description: 'any_description',
    value: 0,
    area: 'any_area',
    address: 'any_address',
    public_place: 'any_public_place',
    number: 'any_number',
    adjunct: 'any_adjunct',
    neighborhood: 'any_neighborhood',
    zip_code: 'any_zip_code',
    city: 'any_city',
    state: 'any_state',
  };
};

interface SutTypes {
  sut: LoadPropertyController;
  loadPropertyStub: LoadProperty;
}

const makeLoadProperty = (): LoadProperty => {
  class LoadPropertyStub implements LoadProperty {
    async load(id: string): Promise<PropertyModel> {
      return new Promise(resolve => resolve(makeFakeProperty()));
    }
  }
  return new LoadPropertyStub();
};

const makeSut = (): SutTypes => {
  const loadPropertyStub = makeLoadProperty();
  const sut = new LoadPropertyController(loadPropertyStub);
  return {
    sut,
    loadPropertyStub,
  };
};

describe('LoadProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return 200 on success', async () => {
    const { sut, loadPropertyStub } = makeSut();
    const httpRequest = {
      params: 'any_id',
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(makeFakeProperty()));
  });

  test('Should return 404 if any property is not found', async () => {
    const { sut, loadPropertyStub } = makeSut();
    jest
      .spyOn(loadPropertyStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const httpRequest = {
      params: 'worng_id',
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(notFound());
  });

  test('Should return 500 if LoadProperty throws', async () => {
    const { sut, loadPropertyStub } = makeSut();
    jest
      .spyOn(loadPropertyStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
