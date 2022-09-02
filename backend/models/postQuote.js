import mongoose from 'mongoose';

const AddressSchema = mongoose.Schema({
  firstLine: String,
  city: String,
  postcode: String,
});

const quoteSchema = mongoose.Schema({
  species: String,
  name: String,
  gender: String,
  breedType: String,
  breed: String,
  age: String,
  spayed: Boolean,
  address: [AddressSchema],
  email: String,
  coverLength: Number,
  quotationCost: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var QuotesModel = mongoose.model('Quotes', quoteSchema);

export default QuotesModel;
