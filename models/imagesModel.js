import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  variants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'variant',
    required: true
  }],
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
    },
  attributes: [
    {
      attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
        required: true
      },
      value: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttributeValue',
        required: true
      }
    }
  ],
  images: {
  type: [String],
  required: true,
  validate: v => v.length > 0
}
}, { timestamps: true });

const imageModel = mongoose.models.Image || mongoose.model('Image', imageSchema);
export default imageModel;