// @author @stanislav-kozak
// This function adds query parameters to a given URL.
// Where queryArray is an array of query parameters in the format 'key=value'.
const addQueryParamsToUrl = (queryArray) => (url) => {
  let modifyUrl = url;

  if (queryArray && queryArray.length > 0) {
    if (modifyUrl.includes('?')) {
      modifyUrl += '&' + queryArray.join('&');

      return modifyUrl;
    }

    modifyUrl += '?' + queryArray.join('&');
  }

  return modifyUrl;
};
export default addQueryParamsToUrl;
