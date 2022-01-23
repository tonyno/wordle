// export type HoursMinSecs = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

import { msInDay, startDate } from "../constants/otherConstants";

// export function msToTime(duration: number): HoursMinSecs {
//   const retVal: HoursMinSecs = {
//     seconds: Math.floor((duration / 1000) % 60),
//     minutes: Math.floor((duration / (1000 * 60)) % 60),
//     hours: Math.floor((duration / (1000 * 60 * 60)) % 24),
//   };
//   return retVal;
// }

// export const timeToNextWord = (): HoursMinSecs => {
//   const epochMs = startDate.getTime();
//   const now = Date.now();
//   let t = msInDay - ((now - epochMs) % msInDay);
//   return msToTime(t);
// };

export const pad = (numv: number, size: number): string => {
  let num = numv.toString();
  while (num.length < size) num = "0" + num;
  return num;
};

type HoursMinSecs = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function msToTime(duration: number): HoursMinSecs {
  const retVal: HoursMinSecs = {
    seconds: Math.floor((duration / 1000) % 60),
    minutes: Math.floor((duration / (1000 * 60)) % 60),
    hours: Math.floor((duration / (1000 * 60 * 60)) % 24),
  };
  return retVal;
}

export const timeToNextWord = (): number => {
  const epochMs = startDate.getTime();
  const now = Date.now();
  let t = msInDay - ((now - epochMs) % msInDay);
  return t;
  //return msToTime(t);
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

// returns like 22.01.
export const dateToStrCZShort = (date: Date): string => {
  return "" + pad(date.getDate(), 2) + "." + pad(date.getMonth() + 1, 2) + ".";
};
