import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';

let propertyCollection: Collection;

describe('Properties Routes', () => {
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

  describe('POST /properties', () => {
    test('Should return 204 on add property success', async () => {
      await request(app)
        .post('/api/properties')
        .send({
          id: '1234',
          publication_date: '01/01/2021',
          title: 'Meu titulo',
          description: 'Minha descrição',
          value: 400000,
          area: '200m',
          address: 'Rua tal',
          public_place: 'Logradouro tal',
          number: '01',
          adjunct: 'Frente',
          neighborhood: 'Bairro tal',
          zip_code: '00000000',
          city: 'Cidade tal',
          state: 'Estado tal',
        })
        .expect(204);
    });
  });

  describe('GET /properties', () => {
    test('Should return 200 on load properties success', async () => {
      await propertyCollection.insertOne({
        title: 'Meu titulo',
        description: 'Minha descrição',
        value: 400000,
        area: '200m',
        address: 'Rua tal',
        public_place: 'Logradouro tal',
        number: '01',
        adjunct: 'Frente',
        neighborhood: 'Bairro tal',
        zip_code: '00000000',
        city: 'Cidade tal',
        state: 'Estado tal',
      });
      await request(app).get('/api/properties').expect(200);
    });
  });

  describe('GET /properties/:id', () => {
    test('Should return 200 on load property success', async () => {
      const res = await propertyCollection.insertOne({
        title: 'Meu titulo',
        description: 'Minha descrição',
        value: 400000,
        area: '200m',
        address: 'Rua tal',
        public_place: 'Logradouro tal',
        number: '01',
        adjunct: 'Frente',
        neighborhood: 'Bairro tal',
        zip_code: '00000000',
        city: 'Cidade tal',
        state: 'Estado tal',
      });
      await request(app).get(`/api/properties/${res.ops[0]._id}`).expect(200);
    });
  });
});
