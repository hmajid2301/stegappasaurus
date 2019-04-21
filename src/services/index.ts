import * as express from "express";
import { initialize } from "express-openapi";
import { https } from "firebase-functions";
import fs from "fs";
import yaml from "js-yaml";

import { HTTPError, ValidateToken } from "./middleware";

/**
 * This module has all the APIs that exist on Firebase. This module is the main
 * module called by the user (from the app). endpoints
 */

const apiDoc = yaml.load(fs.readFileSync('./openapi/specification.yml', 'utf8'));
const app = express();
initialize({
  apiDoc,
  app,
  paths: "./api"
});

app.use(express.json());
app.use(ValidateToken);
app.use(HTTPError);

export default https.onRequest(app);
