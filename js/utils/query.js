export const getQuery = (search = window.location.search) => {
  const query = {};
  search
    .slice(1)
    .split("&")
    .forEach((item) => {
      const arr = item.split("=");
      if (arr[0]) {
        query[arr[0]] = arr[1];
      }
    });

  return query;
};
