const mongoose = require('mongoose');

// 1 Graphic and Design
// 2 Programming and Tech
// 3 Video and Animation

const historyProjectSchema = mongoose.Schema({
  namaJasa: String,
  penjasaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Penjasa'
  },
  namaPencariJasa: {
    type: String
  },
  kategoriJasa: {
    type: Number
  },
  biaya: {
    type: Number
  },
  statusProject: {
    type: Number
  }
});

historyProjectSchema.virtual('id_Penasan').get(function () {
  return this._id.toHexString();
});

historyProjectSchema.set('toJSON', {
  virtuals: true
})

exports.HistoryProject  = mongoose.model('HistoryProject', historyProjectSchema);
