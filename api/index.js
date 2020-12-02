import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './app/db/models';

import authRouter from './app/routes/auth';
import carRouter from './app/routes/car';

const app = express();
const port = process.env.PORT;

db.sequelize.authenticate({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  app.use(cors());
  app.options('*', cors());

  // app.use(express.urlencoded({ extended: false }));
  // app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); 

  app.use('/auth', authRouter);
  app.use('/car', carRouter);
});