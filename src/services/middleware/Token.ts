import * as express from "express";
import { auth } from "firebase-admin";

/**
 * This module is used to authenticate users when make API requests to Firebase.
 */

/**
 *
 * The Firebase APIs are public to anyone could use them. We give the user a token when they
 * make an API request inside the app. This module acts as middleware that intercepts the request
 * and checks that the token is valid. If it is valid then we carry on with the API request,
 * else return a 403 error.
 *
 * @param request: The API request.
 *
 * @param response: The response we would send if the token is invalid.
 *
 * @param next: If the token is valid, pass it onto the actual function
 * that deals with that API request.
 */
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
