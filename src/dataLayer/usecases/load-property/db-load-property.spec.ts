import { DbLoadProperty } from './db-load-property';
import { LoadPropertyRepository, PropertyModel } from './db-load-property-protocols';

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
  sut: DbLoadProperty;
  loadPropertyRepositoryStub: LoadPropertyRepository;
}
const makeLoadPropertyRepository = (): LoadPropertyRepository => {
  class LoadPropertyRepositoryStub implements LoadPropertyRepository {
    async loadOne(id: string): Promise<PropertyModel> {
      return new Promise(resolve => resolve(makeFakeProperty()));
    }
  }
  return new LoadPropertyRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadPropertyRepositoryStub = makeLoadPropertyRepository();
  const sut = new DbLoadProperty(loadPropertyRepositoryStub);
  return {
    sut,
    loadPropertyRepositoryStub,
  };
};

describe('DbLoadProperty', () => {
  test('Should call LoadPropertyRepository', async () => {
    const { sut, loadPropertyRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadPropertyRepositoryStub, 'loadOne');

    await sut.load('any_id');
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a Property on success', async () => {
    const { sut } = makeSut();
    const property = await sut.load('any_id');
    expect(property._id).toEqual('any_id');
  });

  test('Should throw if LoadPropertyRepository throws', async () => {
    const { sut, loadPropertyRepositoryStub } = makeSut();
    jest
      .spyOn(loadPropertyRepositoryStub, 'loadOne')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });
});
