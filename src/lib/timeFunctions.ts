// export type HoursMinSecs = {
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

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

export {};
