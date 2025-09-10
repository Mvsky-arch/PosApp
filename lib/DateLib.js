export const getToday = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  return today;
};

export const getYesterday = () => {
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const dd = String(yesterday.getDate()).padStart(2, "0");
  const mm = String(yesterday.getMonth() + 1).padStart(2, "0");
  const yyyy = yesterday.getFullYear();

  yesterday = yyyy + "-" + mm + "-" + dd;

  return yesterday;
};

export const getLastweek = () => {
  let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
  const dd = String(lastWeek.getDate()).padStart(2, "0");
  const mm = String(lastWeek.getMonth() + 1).padStart(2, "0");
  const yyyy = lastWeek.getFullYear();

  lastWeek = yyyy + "-" + mm + "-" + dd;

  return lastWeek;
};

export const getFirstDayInLastMonth = () => {
  let date = new Date();
  const mm = String(date.getMonth()).padStart(2, "0");
  const yyyy = date.getFullYear();

  date = yyyy + "-" + mm + "-01";

  return date;
};
export const getLastDayInLastMonth = () => {
  let day = new Date();
  const mm = String(day.getMonth()).padStart(2, "0");
  const yyyy = day.getFullYear();
  return lastDayInMonth(yyyy, parseInt(mm));
};

export const lastDayInMonth = (yyyy, mm) => {
  let day;
  switch (mm) {
    case 0:
      day = 31;
      break;
    case 1:
      if (yyyy % 4 === 0) {
        day = 28;
      } else {
        day = 29;
      }
      break;
    case 2:
      day = 31;
      break;
    case 3:
      day = 30;
      break;
    case 4:
      day = 31;
      break;
    case 5:
      day = 30;
      break;
    case 6:
      day = 31;
      break;
    case 7:
      day = 31;
      break;
    case 8:
      day = 30;
      break;
    case 9:
      day = 31;
      break;
    case 10:
      day = 30;
      break;
    case 11:
      day = 31;
      break;
    default:
  }

  return yyyy + "-" + mm + "-" + day;
};

export const getFirstDayInMonth = () => {
  let day = new Date();
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();

  day = yyyy + "-" + mm + "-01";

  return day;
};

export const getLastDayInMonth = () => {
  let day = new Date();
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const yyyy = day.getFullYear();
  return lastDayInMonth(yyyy, parseInt(mm));
};

export const getFirstDayInYear = () => {
  let day = new Date();
  const yyyy = day.getFullYear();

  day = yyyy + "-" + "01-01";

  return day;
};

export const getLastDayInYear = () => {
  let day = new Date();
  const yyyy = day.getFullYear();

  day = yyyy + "-" + "12-31";

  return day;
};

export const getFirstDayInLastYear = () => {
  let day = new Date();
  const yyyy = day.getFullYear() - 1;

  day = yyyy + "-" + "01-01";

  return day;
};

export const getLastDayInLastYear = () => {
  let day = new Date();
  const yyyy = day.getFullYear() - 1;

  day = yyyy + "-" + "12-31";

  return day;
};
