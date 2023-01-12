const mongoose = require('mongoose');

// 1 Graphic and Design
// 2 Programming and Tech
// 3 Video and Animation

const jasaSchema = mongoose.Schema({
  namaJasa: {
    type: String,
    required: true
  },
  penjasaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Penjasa'
  },
  namaPenjasa: String,
  nomorHpPenjasa: String,
  email: String,
  startingPrice: String,
  descJasa: String,
  catJasa: Number,
  image: String 
});

jasaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

jasaSchema.set('toJSON', {
  virtuals: true
})

exports.Jasa  = mongoose.model('Jasa', jasaSchema);
