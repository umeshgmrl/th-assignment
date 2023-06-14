export const secondsToHoursAndMinutes = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);

  let result = "";
  if (hours > 0) {
    result += `${hours}hr `;
  }
  if (minutes > 0) {
    result += `${minutes}m`;
  }
  return result.trim();
};
