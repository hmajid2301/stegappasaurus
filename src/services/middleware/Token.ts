import * as express from "express";
import { auth } from "firebase-admin";

const validateFirebaseToken = (
  request: express.Request,
  response: express.Response,
  next: any
) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    token = request.headers.authorization.split("Bearer ")[1];
  } else {
    response.status(403).send("Unauthorized");
    return;
  }

  auth()
    .verifyIdToken(token)
    .then(() => {
      return next();
    })
    .catch(() => {
      response.status(403).send("Unauthorized");
    });
};

export default validateFirebaseToken;
