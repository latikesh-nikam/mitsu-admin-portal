export const getFileName = (url = '') => {
  const splitUrl = url?.split('/');
  return splitUrl[splitUrl?.length - 1];
};