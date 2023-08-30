/* eslint-disable operator-linebreak */
import { Schema, model, models } from 'mongoose';

const DescriptionSchema = new Schema({
  title: { type: String, required: true },
  text: { type: [String], required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
});

export const Description =
  models?.Description || model('Description', DescriptionSchema);
