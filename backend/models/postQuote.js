import mongoose from 'mongoose'

const quoteSchema = mongoose.Schema({
// object goes here.
})

var QuotesModel = mongoose.model('Quotes', quoteSchema);


export default QuotesModel