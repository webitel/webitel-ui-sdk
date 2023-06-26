const handleUnauthorizedTransformer = (error) => {
  if (error.response && error.response.status === 401) {
    console.warn('intercepted 401');
    localStorage.removeItem('access-token');
  }
  return error;
};

export default handleUnauthorizedTransformer;
