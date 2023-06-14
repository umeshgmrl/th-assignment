export const secondsToHoursAndMinutes = (seconds: number): string => {
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

export const getRandomValue = (): number => {
  var min = 15;
  var max = 75;
  var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomValue;
};
