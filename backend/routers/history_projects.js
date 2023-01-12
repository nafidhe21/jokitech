const {HistoryProject} = require('../models/history_project');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

/*********************** GET ALL HISTORY PROJECT BY ID ************************/

router.get(`/getAllHistoryProject/:id`, async (req, res)=> {
  var penjasaId = req.params.id
  
  const historyProjectList = await HistoryProject.find({penjasaId: penjasaId});

  if(!historyProjectList) {
    res.status(500).json({
      success: false
    })
  }
  res.send(historyProjectList);
});

/*************************** CREATE HISTORY PROJECT *****************************/

router.post(`/createHistoryProject`,  async (req, res)=> {
  
  let historyProject = new HistoryProject({
    namaJasa: req.body.namaJasa,
    penjasaId: req.body.penjasaId,
    namaPencariJasa: req.body.namaPencariJasa,
    kategoriJasa: req.body.kategoriJasa,
    biaya: req.body.biaya,
    statusProject: req.body.statusProject
  });

  historyProject = await historyProject.save();

  if(!historyProject) {
    return res.status(404).send('the history project cannot be created');
  }
  res.send(historyProject);
});

/**************************** DELETE HISTORY PROJECT *********************************/

router.delete('/deleteHistoryProject/:id', async (req, res)=> {
  HistoryProject.findByIdAndDelete(req.params.id)
    .then(historyProject => {
      if(historyProject) {
        return res.status(200).json({success: true, message: 'History Project is deleted'});
      } else {
        return res.status(404).json({success: false, message: 'History Project not found'});
      }
    }).catch(err=>{
      return res.status(400).json({success: false, error: err});
    })
});

/***************************** UPDATE HISTORY PROJECT *********************************/

router.put('/updateHistoryProject/:id', async (req, res) => {
  const historyProject = await HistoryProject.findOneAndUpdate(
  {"_id" : mongoose.Types.ObjectId(req.params.id)},
    {
      namaJasa: req.body.namaJasa,
      penjasaId: req.body.penjasaId,
      namaPencariJasa: req.body.namaPencariJasa,
      kategoriJasa: req.body.kategoriJasa,
      biaya: req.body.biaya,
      statusProject: req.body.statusProject
    },
    { new: true }
  )

  if(!historyProject) {
    return res.status(404).send('the history project cannot be updated');
  }

  res.send(historyProject);
});

/********************* GET HISTORY PROJECT SUM BY PENJASA ID *****************/

router.get('/getHistoryProjectSum/:id', async (req, res) => {
  const idpenjasa = req.params.id;

  const historyProjectSum = await HistoryProject.aggregate([
    {$match: { "penjasaId": mongoose.Types.ObjectId(idpenjasa), statusProject: 2}},
    {$group: { _id: null, totalSum: {$sum: "$biaya"} }}
  ]);

  if(!historyProjectSum) {
    return res.status(500).send('unsucessful');
  }

  res.send(historyProjectSum);
})

// get history project total

router.get('/getHistoryProjectTotal/:id', async (req, res) => {
  const idpenjasa = req.params.id;

  const historyProjectTotal = await HistoryProject.aggregate([
    {$match: { "penjasaId": mongoose.Types.ObjectId(idpenjasa)}},
    {$count: "totalProject" }
  ]);

  if(!historyProjectTotal) {
    return res.status(500).send('unsucessful');
  }

  res.send(historyProjectTotal);
})

// get history project that is done

router.get('/getHistoryProjectFinished/:id', async (req, res) => {
  const idpenjasa = req.params.id;

  const historyProjectFinished = await HistoryProject.aggregate([
    {$match: { "penjasaId": mongoose.Types.ObjectId(idpenjasa), statusProject: 2}},
    {$count: "totalProjectFinished" }
  ]);

  if(!historyProjectFinished) {
    return res.status(500).send('unsucessful');
  }

  res.send(historyProjectFinished);
})

module.exports = router;
