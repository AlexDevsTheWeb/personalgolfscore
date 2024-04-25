import dayjs from 'dayjs';

export const dayjsForMaterial = (date?: dayjs.Dayjs | null) => {
  if (!date) return undefined;
  return date
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);
};