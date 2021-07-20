import { LoadPropertiesRepository, PropertyModel } from './db-add-properties-protocols';
import { DbLoadProperties } from './db-load-properties';

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
  sut: DbLoadProperties;
  loadPropertiesRepositoryStub: LoadPropertiesRepository;
}
const makeLoadPropertiesRepository = (): LoadPropertiesRepository => {
  class LoadPropertiesRepositoryStub implements LoadPropertiesRepository {
    async loadAll(query?: any): Promise<PropertyModel[]> {
      return new Promise(resolve => resolve(makeFakeProperties()));
    }
  }
  return new LoadPropertiesRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadPropertiesRepositoryStub = makeLoadPropertiesRepository();
  const sut = new DbLoadProperties(loadPropertiesRepositoryStub);
  return {
    sut,
    loadPropertiesRepositoryStub,
  };
};

describe('DbLoadProperties', () => {
  test('Should call LoadPropertiesRepository', async () => {
    const { sut, loadPropertiesRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadPropertiesRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of Properties on success', async () => {
    const { sut } = makeSut();
    const properties = await sut.load();
    expect(properties).toEqual(makeFakeProperties());
  });

  test('Should throw if LoadPropertiesRepository throws', async () => {
    const { sut, loadPropertiesRepositoryStub } = makeSut();
    jest
      .spyOn(loadPropertiesRepositoryStub, 'loadAll')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
