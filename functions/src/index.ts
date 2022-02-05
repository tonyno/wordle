/* eslint-disable object-curly-spacing */
// https://firebase.google.com/docs/functions/typescript
// good example: https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const startDate = new Date(2022, 0, 14, 18, 0);
//export const startDate = new Date(2022, 0, 14, 0, 35);
const msInDay = 86400000;

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

export const getWordIndex = (): number => {
  //return { solution: "ROBOT", solutionIndex: 1 };
  const epochMs = startDate.getTime();
  const now = Date.now();
  const index = Math.floor((now - epochMs) / msInDay);
  return index;
};

// export type StatsType = {
//   firstGuesses: any;
//   games: number;
//   guessesDistribution: number[];
//   id: string;
//   loose: number;
//   win: number;
// };

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
        functions.logger.info("Saved. Result value: ", retVal);
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

type FirstWords = { [key in string]: number };

type FirstWordDb = { word: string; count: number };

type StatsDay = {
  games: number;
  loose: number;
  win: number;
  firstGuesses: FirstWordDb[];
  guessesDistribution: number[];
};

exports.statistics = functions.pubsub
  .schedule("every day 18:07")
  .timeZone("Europe/Prague")
  .onRun(async (context) => {
    const now = new Date();
    const day = "day" + getWordIndex();
    functions.logger.info(
      "Current date and time: " +
        now.toString() +
        " going to analyze day " +
        day
    );
  });

exports.statisticsTest = functions.https.onRequest(
  async (request, response) => {
    const now = new Date();
    let day = "day" + getWordIndex();
    functions.logger.info(
      "Current date and time: " +
        now.toString() +
        " going to analyze day " +
        day
    );

    day = "day20";

    const guessesDistribution = [0, 0, 0, 0, 0, 0, 0];
    let winCount = 0;
    let looseCount = 0;
    const firstWords: FirstWords = {};

    const querySnapshot = await db
      .collection("gameResult")
      .doc(day)
      .collection("result")
      .get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.result === "win") {
        guessesDistribution[data.numberOfGuesses] += 1;
        winCount += 1;
      } else if (data.result === "loose") {
        guessesDistribution[6] += 1;
        looseCount += 1;
      }
      if (data.guesses && data.guesses.length > 0) {
        const firstWord = data.guesses[0];
        if (firstWord in firstWords) {
          firstWords[firstWord] += 1;
        } else {
          firstWords[firstWord] = 1;
        }
      }
      //functions.logger.info(data);
    });

    //const str = firstWords.toString();
    const firstWordsSliced = Object.entries(firstWords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((item) => {
        return { word: item[0], count: item[1] };
      });

    const statsResult: StatsDay = {
      games: looseCount + winCount,
      loose: looseCount,
      win: winCount,
      guessesDistribution: guessesDistribution,
      firstGuesses: firstWordsSliced,
    };

    const entry = db.collection("gameStats").doc("wordle");
    const currentData = entry ? (await entry.get()).data() || {} : {};
    currentData[day] = statsResult;
    const retVal = await entry.set(currentData);
    functions.logger.info("Data updated. Result value: ", retVal);

    functions.logger.info("Updated record", statsResult);
    response.send("Hello from Firebase!!!!!>> " + getWordIndex());
  }
);

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
