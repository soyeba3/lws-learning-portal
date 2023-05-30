export const shortenFunc = (text) => {
  return text?.length > 35 ? text?.trim().substr(0, 35) + "..." : text;
};
