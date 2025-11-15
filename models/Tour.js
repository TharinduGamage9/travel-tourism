import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
});

const TourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    city: { type: String, required: true },
    distance: { type: mongoose.Schema.Types.Mixed, required: false }, // Can be number or string
    maxGroupSize: { type: Number, required: false },
    shortDesc: { type: String, required: true },
    desc: { type: String, required: true },
    reviews: [ReviewSchema],
    avgRating: { type: Number, default: 0 },
    photo: { type: String, required: true }, // Image URL path
    featured: { type: Boolean, default: false },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tour || mongoose.model('Tour', TourSchema);

