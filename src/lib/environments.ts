export const isProduction = (): boolean => {
  //return true;
  //console.log(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production";
};
