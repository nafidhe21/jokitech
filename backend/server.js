const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const multer = require('multer');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

const Penjasa = require('./models/penjasa');
const Jasa = require('./models/jasa');
const HistoryProject = require('./models/history_project');

const api = process.env.API_URL;
const penjasasRoutes = require('./routers/penjasas');
const jasasRoutes = require('./routers/jasas');
const historyProjectRoutes = require('./routers/history_projects');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(authJwt());
app.use(errorHandler);

//Routers
app.use(`${api}/penjasas`, penjasasRoutes);
app.use(`${api}/jasas`, jasasRoutes);
app.use(`${api}/history_projects`, historyProjectRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'JokitechAppDB'
})
  .then(()=>{
    console.log('Database Connection is ready');
  })
  .catch((err)=>{
    console.log(err);
  });


app.listen(4000, ()=>{
  console.log("Connected to localhost:4000");
});
