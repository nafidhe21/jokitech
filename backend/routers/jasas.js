const {Jasa} = require('../models/jasa');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
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

/************** list jasa by penjasaid **************/

// without token
router.get('/view/penjasaid/:id', async(req, res) => {
  const penjasaId = req.params.id;

  const jasaList = await Jasa.find({"penjasaId": mongoose.Types.ObjectId(penjasaId)});

  if(!jasaList) {
    res.status(404).json({success: false});
  }
  res.send(jasaList);

});

// with token
router.get('/penjasaid/:id', async(req, res) => {
  const penjasaId = req.params.id;

  const jasaList = await Jasa.find({"penjasaId": mongoose.Types.ObjectId(penjasaId)});

  if(!jasaList) {
    res.status(404).json({success: false});
  }
  res.send(jasaList);

});

/************** GET **************/

router.get(`/getAll`, async (req, res)=> {
  const jasaList = await Jasa.find();

  if(!jasaList) {
    res.status(500).json({
      success: false
    })
  }
  res.send(jasaList);
});

// 1 Graphic and Design
router.get(`/getCat1`, async (req, res)=> {
  const jasaList1 = await Jasa.find({catJasa: 1});

  if(!jasaList1) { res.status(500).json({
      success: false
    })
  }
  res.send(jasaList1);
});

// 2 Programming and Tech
router.get(`/getCat2`, async (req, res)=> {
  const jasaList2 = await Jasa.find({catJasa: 2});

  if(!jasaList2) {
    res.status(500).json({
      success: false
    })
  }
  res.send(jasaList2);
});

// 3 Video and Animation
router.get(`/getCat3`, async (req, res)=> {
  const jasaList3 = await Jasa.find({catJasa: 3});

  if(!jasaList3) {
    res.status(500).json({
      success: false
    })
  }
  res.send(jasaList3);
});

router.get('/view/jasaid/:id', async (req, res)=>{
  const jasa = await Jasa.findById(req.params.id);

  if(!jasa) {
    res.status(500).json({message: 'Jasa with following id not found'});
  }
  res.status(200).send(jasa);
});


/************** POST **************/

router.post(`/createJasa`, upload.single('image'), async (req, res)=> {
  const file = req.file;
  if(!file) return res.status(400).send('No image in the request');

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  
  let jasa = new Jasa({
    namaJasa: req.body.namaJasa,
    penjasaId: req.body.penjasaId,
    namaPenjasa: req.body.namaPenjasa,
    nomorHpPenjasa: req.body.nomorHpPenjasa,
    email: req.body.email,
    startingPrice: req.body.startingPrice,
    descJasa: req.body.descJasa,
    catJasa: req.body.catJasa,
    image: `${basePath}${fileName}`
  });

  jasa = await jasa.save();

  if(!jasa) {
    return res.status(404).send('the jasa cannot be created');
  }

  res.send(jasa);

});

/************** DELETE **************/

router.delete('/deleteJasa/:id', async (req, res)=> {
  Jasa.findByIdAndDelete(req.params.id)
    .then(jasa => {
      if(jasa) {
        return res.status(200).json({success: true, message: 'Jasa is deleted'});
      } else {
        return res.status(404).json({success: false, message: 'Jasa not found'});
      }
    }).catch(err=>{
      return res.status(400).json({success: false, error: err});
    })
});


/************** UPDATE **************/

router.put('/updateJasa/:id', upload.single('image'), async (req, res) => {

  let jasa = await Jasa.findById(req.params.id);
  if(!jasa) return res.status(400).send('Invalid Jasa');

  const file = req.file;
  let imagepath;

  if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
      imagepath = `${basePath}${fileName}`;
  } else {
      imagepath = jasa.image;
      
  }

  jasa = await Jasa.findOneAndUpdate(
  {"_id" : mongoose.Types.ObjectId(req.params.id)},
    {
      namaJasa: req.body.namaJasa,
      penjasaId: req.body.penjasaId,
      namaPenjasa: req.body.namaPenjasa,
      nomorHpPenjasa: req.body.nomorHpPenjasa,
      email: req.body.email,
      startingPrice: req.body.startingPrice,
      image: imagepath,
      descJasa: req.body.descJasa,
      catJasa: req.body.catJasa
    },
  { new: true }
  )

  if(!jasa) {
    return res.status(404).send('the jasa cannot be created');
  }

  res.send(jasa);
});

module.exports = router;
