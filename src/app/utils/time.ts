import moment from "moment";

export const getCreatedTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const dateString = date
    .toLocaleDateString(undefined, options)
    .replace(/\//g, "");
  return moment(date, "YYYYMMDD").fromNow();
};
