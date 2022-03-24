/**
 * Converts string that have date value inside into local string MMM/d
 *
 * @param {string} dateString
 * @returns {string}
 */
const convertStringDateToLocalString = (dateString: string): string => {
  const newDate = new Date(dateString);

  return newDate.toLocaleString("en-CA", { month: "short", day: "numeric" });
};

export default convertStringDateToLocalString;
