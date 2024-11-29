// Hàm tính thời gian theo múi giờ Việt Nam (GMT+7)
export function convertToVietnamTime(date: Date): Date {
  const vietnamTimeOffset = 7 * 60; // GMT+7 in minutes
  const localTime = new Date(date.getTime() + vietnamTimeOffset * 60 * 1000);
  return localTime;
}
