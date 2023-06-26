const getDefaultGetParams = ({
  page = 1,
  size = 10,
                             } = {}) => ({
  page,
  size,
});

export default getDefaultGetParams;
