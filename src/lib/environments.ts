export const isProduction = (): boolean => {
  console.log(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production";
};
