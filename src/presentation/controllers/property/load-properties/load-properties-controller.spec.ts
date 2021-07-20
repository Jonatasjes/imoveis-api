import { LoadPropertiesController } from './load-properties-controller';
import {
  LoadProperties,
  PropertyModel,
} from './load-properties-controller-protocols';

import MockDate from 'mockdate';
import { noContent, ok, serverError } from '../../../helpers/http-helper';

const makeFakeProperties = (): PropertyModel[] => {
  return [
    {
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
    },
    {
      _id: 'other_id',
      publication_date: new Date(),
      title: 'other_title',
      description: 'other_description',
      value: 0,
      area: 'other_area',
      address: 'other_address',
      public_place: 'other_public_place',
      number: 'other_number',
      adjunct: 'other_adjunct',
      neighborhood: 'other_neighborhood',
      zip_code: 'other_zip_code',
      city: 'other_city',
      state: 'other_state',
    },
  ];
};

interface SutTypes {
  sut: LoadPropertiesController;
  loadPropertiesStub: LoadProperties;
}

const makeLoadProperties = (): LoadProperties => {
  class LoadPropertiesStub implements LoadProperties {
    async load(): Promise<PropertyModel[]> {
      return new Promise(resolve => resolve(makeFakeProperties()));
    }
  }
  return new LoadPropertiesStub();
};

const makeSut = (): SutTypes => {
  const loadPropertiesStub = makeLoadProperties();
  const sut = new LoadPropertiesController(loadPropertiesStub);
  return {
    sut,
    loadPropertiesStub,
  };
};

describe('LoadProperties Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadProperties', async () => {
    const { sut, loadPropertiesStub } = makeSut();
    const loadSpy = jest.spyOn(loadPropertiesStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeProperties()));
  });

  test('Should return 204 if LoadProperties returns empty', async () => {
    const { sut, loadPropertiesStub } = makeSut();
    jest
      .spyOn(loadPropertiesStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve([])));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if AddProperty throws', async () => {
    const { sut, loadPropertiesStub } = makeSut();
    jest
      .spyOn(loadPropertiesStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
