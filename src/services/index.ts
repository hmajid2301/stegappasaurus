import express from "express";
import { OpenApiValidator } from "express-openapi-validator";
import { initializeApp } from "firebase-admin";
import { config, https } from "firebase-functions";
import { resolve } from "path";

import { decode, encode } from "./web/controllers";
import { ValidateToken } from "./web/middleware";

initializeApp();
const app = express();
new OpenApiValidator({
  apiSpecPath: resolve(__dirname, "./openapi/specification.yml")
}).install(app);

const isProduction = config().env.production;
app.use(express.json());
if (isProduction === "true") {
  app.use(ValidateToken);
}

app.post("/encode", encode);
app.post("/decode", decode);
export const api = https.onRequest(app);
