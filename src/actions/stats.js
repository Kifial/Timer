export const getMonth = () => {
  let month = new Date().getMonth() + 1;
  if (month.toString().length == 1) {
    month = `0${month}`;
  } else {
    month = `${month}`;
  }
  return month
};

