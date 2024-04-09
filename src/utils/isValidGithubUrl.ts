export const isValidGithubUrl = (url: string): boolean => {
  const pattern = /^https:\/\/github\.com\/[^/]+\/[^/]+$/;
  return pattern.test(url);
};