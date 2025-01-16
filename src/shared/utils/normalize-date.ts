import { MONTHS } from './../constants/months';

function normalizeDate(date: string) {
  const currentDate = new Date(date);

  const year = currentDate.getFullYear();
  const monthIdx = currentDate.getMonth();

  const dateLabel = `${MONTHS[monthIdx]} ${year}`;
  const attrDateTime = currentDate.toLocaleDateString().split('.').reverse().join('-');

  return {
    dateLabel,
    attrDateTime,
  };
}

export default normalizeDate;
