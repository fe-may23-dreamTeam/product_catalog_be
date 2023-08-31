import { Model, Schema, model, models } from 'mongoose';
import { Category, ICategory } from './category.model';
import { Description, IDescription } from './description.model';

export interface IProduct {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  description: IDescription[];
  category: ICategory;
}

const ProductSchema = new Schema<IProduct>({
  id: { type: String, required: true },
  namespaceId: { type: String, required: true },
  name: { type: String, required: true },
  capacityAvailable: { type: [String] },
  capacity: { type: String },
  priceRegular: { type: Number, required: true },
  priceDiscount: { type: Number, required: true },
  colorsAvailable: { type: [String], required: true },
  color: { type: String, required: true },
  images: { type: [String], required: true },
  screen: { type: String },
  resolution: { type: String },
  processor: { type: String },
  ram: { type: String },
  camera: { type: String },
  zoom: { type: String },
  cell: { type: [String] },
  description: [{ type: Schema.Types.ObjectId, ref: Description }],
  category: { type: Schema.Types.ObjectId, ref: Category },
});

export const Product =
  (models?.Product as Model<IProduct>) || model('Product', ProductSchema);
