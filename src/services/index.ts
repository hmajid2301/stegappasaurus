import * as express from "express";
import { OpenApiValidator } from "express-openapi-validator";
import { initializeApp } from "firebase-admin";
import { https } from "firebase-functions";
import { resolve } from "path";

import { HTTPError, ValidateToken } from "./middleware";
import { decode, encode } from "./web/controllers";

/**
 * This module has all the APIs that exist on Firebase. This module is the main
 * module called by the user (from the app). We currently have the following
 * endpoints
 */
initializeApp();
const app = express();
new OpenApiValidator({
  apiSpecPath: resolve(__dirname, "./openapi/specification.yml")
}).install(app);

app.use(express.json());
app.use(ValidateToken);
app.use(HTTPError);

app.post("/encode", encode);
app.post("/decode", decode);
export const api = https.onRequest(app);
