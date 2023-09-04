const getId = (pathname) => {
  const pathnameArray = pathname.split("/");
  return pathnameArray[pathnameArray.length - 1];
};

export default getId;
