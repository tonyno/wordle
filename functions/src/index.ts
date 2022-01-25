/* eslint-disable object-curly-spacing */
// https://firebase.google.com/docs/functions/typescript
// good example: https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const db = admin.firestore();

export const pad = (numv: number, size: number): string => {
  let num = numv.toString();
  while (num.length < size) num = "0" + num;
  return num;
};

// returns like 2022-01-19
export const dateToStr = (date: Date): string => {
  return (
    "" +
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1, 2) +
    "-" +
    pad(date.getDate(), 2)
  );
};

// https://firebase.google.com/docs/functions/schedule-functions
// https://cloud.google.com/appengine/docs/standard/python/config/cronref
exports.unlockNewWord = functions.pubsub
  .schedule("every day 08:00")
  .timeZone("Europe/Prague")
  .onRun(async (context) => {
    try {
      const now = new Date();
      const actualDateStr = dateToStr(now);
      functions.logger.info(
        "Current date and time: ",
        now.toString(),
        ". Going to open word for: ",
        actualDateStr +
          ". Actual hour " +
          now.getHours() +
          " utc hour " +
          now.getUTCHours()
      );

      const entry = db.collection("word").doc(actualDateStr);
      const currentData = (await entry.get()).data() || {};
      if (currentData && currentData.solution && currentData.solutionIndex) {
        currentData.locked = false;
        const retVal = await entry.set(currentData);
        functions.logger.info(
          "Successfully changed. Result value: " + retVal.toString()
        );
      } else {
        functions.logger.error(
          "Word item not found in database " + actualDateStr
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      functions.logger.error("Exception during processing: ", error);
    }
  });

// TODO

// It looks like you're using the development build of the Firebase JS SDK.
// When deploying Firebase apps to production, it is advisable to only import
// the individual SDK components you intend to use.

// For the module builds, these are available in the following manner
// (replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

// CommonJS Modules:
// const firebase = require('firebase/app');
// require('firebase/<PACKAGE>');

// ES Modules:
// import firebase from 'firebase/app';
// import 'firebase/<PACKAGE>';
