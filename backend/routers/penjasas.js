const {Penjasa} = require('../models/penjasa');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if(isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const upload = multer({ storage: storage })

const secret = process.env.secret;


/**************************** GET ALL USER ********************/

router.get(`/`, async (req, res)=> {
  const penjasaList = await Penjasa.find().select('-password');

  if(!penjasaList) {
    res.status(500).json({
      success: false
    })
  }
  res.send(penjasaList);
});


/**************************** GET USER BY ID ********************/

router.get(`/view/:id`, async (req, res)=> {
  const penjasa = await Penjasa.findById(req.params.id).select('-password');

  if(!penjasa) {
    res.status(500).json({
      success: false,
      message: 'Penjasa with given ID does not exist'
    })
  }

  res.send(penjasa);
});

/*************************** REGISTER USER ************************/

router.post(`/register`, async (req, res)=> {


  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/default-profile.jpg`;

  let penjasa = new Penjasa({
    namaPenjasa: req.body.namaPenjasa,
    nomorHpPenjasa: req.body.nomorHpPenjasa,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    profilePicture: `${basePath}`
  });

  penjasa  = await penjasa.save();

  if(!penjasa)
    return res.status(400).send('the user cannot be created');
  res.send(penjasa);

});

/***************************** USER LOGIN ******************************/

router.post('/login', async (req, res) => {
  const penjasa = await Penjasa.findOne({email: req.body.email});

  if(!penjasa) {
    return res.status(400).send('The penjasa not found');
  }

  if(penjasa && bcrypt.compareSync(req.body.password, penjasa.password)) {
    const token = jwt.sign(
      {
        penjasaId: penjasa.id,
        namaPenjasa: penjasa.namaPenjasa,
        email: penjasa.email,
        nomorHpPenjasa: penjasa.nomorHpPenjasa
      },
      secret
    ) 

    res.status(200).send({email: penjasa.email, token: token});
  } else {
    res.status(400).send('Password is wrong');
  };

});

/**************************** UPDATE / ISI BIODATA ********************************/

router.put('/updateBio/:id', upload.single('profilePicture'), async (req, res)=> {

  const penjasa = await Penjasa.findById(req.params.id);
  if(!penjasa) return res.status(400).send('Invalid Penjasa');

  const file = req.file;
  let imagepath;

  if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
      imagepath = `${basePath}${fileName}`;
  } else {
      imagepath = penjasa.profilePicture;
      
  }


  const updatedPenjasa = await Penjasa.findByIdAndUpdate(
    req.params.id,
    {
      namaPenjasa: req.body.namaPenjasa,
      username: req.body.username,
      nomorHpPenjasa: req.body.nomorHpPenjasa,
      aboutMe: req.body.aboutMe,
      profilePicture: imagepath
    },
    {new: true}
  )
  
  if(!updatedPenjasa) {
    return res.status(404).send('the jasa cannot be updated');
  }

  res.send(updatedPenjasa);
});

/************************ DELETE USER **************************/

// note: delete jasa and history project before deleting user

router.delete('/deletePenjasa/:id', async (req, res)=> {
  Penjasa.findByIdAndDelete(req.params.id)
    .then(penjasa => {
      if(penjasa) {
        return res.status(200).json({success: true, message: 'User is deleted'});
      } else {
        return res.status(404).json({success: false, message: 'User not found'});
      }
    }).catch(err=>{
      return res.status(400).json({success: false, error: err});
    })
});

module.exports = router;
