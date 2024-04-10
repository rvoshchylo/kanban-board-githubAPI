export const countWatchers = (watchers: number): string => {
  const watchersString = watchers.toString();
  if (watchersString.length > 3) {
    return `${watchersString.slice(0, -3)}K`;
  }
  return watchersString;
};