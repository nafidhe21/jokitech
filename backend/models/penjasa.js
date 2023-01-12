const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

function defaultProfilePath (req) {
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/default-profile.jpg`;
  return basePath;
}

const penjasaSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  namaPenjasa : {
    type: String
  },
  username: {
    type: String
  },
  nomorHpPenjasa: String,
  aboutMe: {
    type: String,
    default: ''
  },
  profilePicture: String
});

penjasaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

penjasaSchema.set('toJSON', {
  virtuals: true
})

penjasaSchema.plugin(uniqueValidator)

exports.Penjasa  = mongoose.model('Penjasa', penjasaSchema);
exports.penjasaSchema = penjasaSchema;
