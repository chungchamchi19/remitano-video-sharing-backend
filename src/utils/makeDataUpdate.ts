export const makeDataUpdate = (data: { [key: string]: any }) => {
  for (const key in data) {
    if (data[key] === undefined) {
      delete data[key];
    }
  }
  return data;
};
