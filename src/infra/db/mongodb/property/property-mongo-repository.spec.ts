import { MongoHelper } from '../helpers/mongo-helper';
import { PropertyMongoRepository } from './property-mongo-repository';
import { Collection } from 'mongodb';
import { AddPropertyModel } from '../../../../domain/usecases/add-property';

let propertyCollection: Collection;

const makePropertyData = (): AddPropertyModel => ({
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
});

const makeSut = (): PropertyMongoRepository => {
  return new PropertyMongoRepository();
};

describe('Property Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    propertyCollection = await MongoHelper.getCollection('properties');
    await propertyCollection.deleteMany({});
  });

  describe('add()', () => {
    test('Should add a property on success', async () => {
      const sut = makeSut();
      const propertyData = makePropertyData();
      await sut.add(propertyData);
      const property = await propertyCollection.findOne({ title: 'any_title' });
      expect(property).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('Should load all properties on success', async () => {
      await propertyCollection.insertMany([
        makePropertyData(),
        {
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
      ]);
      const sut = makeSut();
      const properties = await sut.loadAll();
      expect(properties.length).toBe(2);
      expect(properties[0].title).toBe('any_title');
      expect(properties[1].title).toBe('other_title');
    });

    test('Should load empty list ', async () => {
      const sut = makeSut();
      const properties = await sut.loadAll();
      expect(properties.length).toBe(0);
    });
  });

  describe('loadOne()', () => {
    test('Should load the property finded by ID on success', async () => {
      const res = await propertyCollection.insertOne({
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
      });
      const sut = makeSut();
      const property = await sut.loadOne(res.ops[0]._id);
      expect(property._id).toEqual(res.ops[0]._id);
    });
  });

  describe('Update()', () => {
    test('Should Update the property finded by ID on success', async () => {
      const res = await propertyCollection.insertOne({
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
      });

      const data = {
        id: res.ops[0]._id,
        body: { city: 'other_city' },
      };

      const sut = makeSut();
      const property = await sut.update(data);
      expect(property.city).toEqual('other_city');
    });
  });

  describe('Delete()', () => {
    test('Should Delete the property finded by ID on success', async () => {
      const res = await propertyCollection.insertOne({
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
      });

      const sut = makeSut();
      await sut.delete(res.ops[0]._id);
      const property = await sut.loadOne(res.ops[0]._id);
      expect(property).toEqual(null);
    });
  });
});
