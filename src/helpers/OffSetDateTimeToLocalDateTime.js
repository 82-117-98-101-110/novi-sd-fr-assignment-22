function OffSetDateTimeToLocalDateTime(date) {
  const d = new Date(date);
  return d.toUTCString();
}

export default OffSetDateTimeToLocalDateTime();
