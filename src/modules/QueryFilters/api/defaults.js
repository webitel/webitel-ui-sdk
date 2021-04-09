const PAGE = 1;
const SIZE = 20;
const FIELDS = ['id', 'name'];

export const defaultParams = {
  page: PAGE,
  size: SIZE,
  fields: FIELDS,
};

export const listResponseHandler = (response) => (
  response.items.map((item) => ({
    name: item.name,
    id: item.id,
  }))
);
