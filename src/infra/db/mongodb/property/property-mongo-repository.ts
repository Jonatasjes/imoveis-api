import { ObjectId } from 'mongodb';
import { AddPropertyRepository } from '../../../../dataLayer/protocols/db/property/add-property-repository';
import { DeletePropertyRepository } from '../../../../dataLayer/protocols/db/property/delete-property-repository';
import { LoadPropertiesRepository } from '../../../../dataLayer/protocols/db/property/load-properties-repository';
import { LoadPropertyRepository } from '../../../../dataLayer/protocols/db/property/load-property-repository';
import { UpdatePropertyRepository } from '../../../../dataLayer/protocols/db/property/update-property-repository';
import { PropertyModel, UpdatePropertyModel } from '../../../../domain/models/property';
import { AddPropertyModel } from '../../../../domain/usecases/add-property';
import { MongoHelper } from '../helpers/mongo-helper';

export class PropertyMongoRepository
  implements
    AddPropertyRepository,
    LoadPropertiesRepository,
    LoadPropertyRepository,
    UpdatePropertyRepository,
    DeletePropertyRepository
{
  async add(propertyData: AddPropertyModel): Promise<void> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    await propertyCollection.insertOne(propertyData);
  }

  async loadAll(query?: any): Promise<PropertyModel[]> {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    const search = query.search ? { title: { $regex: query.search } } : {};

    const propertyCollection = await MongoHelper.getCollection('properties');
    const properties = propertyCollection.find(search).skip(skip).limit(limit).toArray();
    return properties;
  }

  async loadOne(id: string): Promise<PropertyModel> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    const newId = new ObjectId(id);
    const property = await propertyCollection.findOne({
      _id: newId,
    });
    return property;
  }

  async update(updateData: UpdatePropertyModel): Promise<PropertyModel | null> {
    const propertyCollection = await MongoHelper.getCollection('properties');

    const newId = new ObjectId(updateData.id);
    const body = updateData.body;
    const property = await propertyCollection.findOneAndUpdate(
      { _id: newId },
      { $set: { ...body, publication_date: new Date() } },
      { returnOriginal: false },
    );
    return property.value;
  }

  async delete(id: string): Promise<void> {
    const propertyCollection = await MongoHelper.getCollection('properties');
    const newId = new ObjectId(id);
    await propertyCollection.remove({ _id: newId });
  }
}
