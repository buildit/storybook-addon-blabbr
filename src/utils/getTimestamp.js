const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const getTimestamp = timestamp => {
  const _date = new Date(parseInt(timestamp, 10));
  const date = _date.getDate();
  const month = months[_date.getMonth()];
  const year = _date.getFullYear();
  const time = `${_date.getHours()}:${`0${_date.getMinutes()}`.slice(-2)}`;

  return `${date} ${month} ${year}, ${time}`;
};
