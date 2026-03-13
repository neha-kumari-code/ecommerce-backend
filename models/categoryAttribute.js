import mongoose from "mongoose";

const categoryAttributeSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  attribute: { type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', required: true }
});

const CategoryAttribute = mongoose.models.CategoryAttribute || mongoose.model('CategoryAttribute', categoryAttributeSchema);
export default CategoryAttribute;
