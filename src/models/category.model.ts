import { Model, Schema, model, models } from 'mongoose';

export interface ICategory {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

export const Category =
  (models?.Category as Model<ICategory>) || model('Category', CategorySchema);
