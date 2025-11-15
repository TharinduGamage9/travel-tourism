import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true }, // Image URL path
    alt: { type: String, required: true },
    title: { type: String, required: false },
    category: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

