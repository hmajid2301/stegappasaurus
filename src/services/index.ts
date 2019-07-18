import express from "express";
import { OpenApiValidator } from "express-openapi-validator";
import { initializeApp } from "firebase-admin";
import { https } from "firebase-functions";
import { resolve } from "path";

import { decode, encode } from "./web/controllers";
// import { ValidateToken } from "./web/middleware";

initializeApp();
const app = express();
new OpenApiValidator({
  apiSpecPath: resolve(__dirname, "./openapi/specification.yml")
}).install(app);

app.use(express.json());
// app.use(ValidateToken);

app.post("/encode", encode);
app.post("/decode", decode);
export const api = https.onRequest(app);
