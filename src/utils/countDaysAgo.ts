export const daysAgo = (date: string): number => {
  const today = new Date();
  const created = new Date(date);
  const diffTime = Math.abs(today.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};