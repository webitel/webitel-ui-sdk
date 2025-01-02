const getNextSortOrder = (sort) => {
  switch (sort) {
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
  }
};

export default getNextSortOrder;
