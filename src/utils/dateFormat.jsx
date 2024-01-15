import moment from 'moment';

export const dateFormat = (date) => {

  const formattedDate = moment(date, 'MM/DD/YYYY').format('MM/DD/YYYY');
  return formattedDate;
};

