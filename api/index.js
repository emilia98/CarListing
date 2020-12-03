import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import db from './app/db/models';
import swaggerDocument from './swagger.json';

import authRouter from './app/routes/auth';
import carRouter from './app/routes/car';

const app = express();
const port = process.env.PORT;

db.sequelize.authenticate({ force: false }).then(() => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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