import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
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
  description: [{ type: Schema.Types.ObjectId, ref: 'Description' }],
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

export const Product = models.Product || model('Product', ProductSchema);
