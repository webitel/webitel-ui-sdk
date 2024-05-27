function createPlyrURL(baseURL) {
  // Check if baseURL is exactly "/" and adjust it to an empty string
  let normalizedBaseURL = baseURL === '/' ? '' : baseURL;

  // Ensure there is no trailing slash in normalizedBaseURL to prevent double slashes
  normalizedBaseURL = normalizedBaseURL.endsWith('/')
    ? normalizedBaseURL.slice(0, -1)
    : normalizedBaseURL;

  // Construct iconUrl
  return `${normalizedBaseURL}/img/plyr.svg`;
}

export default createPlyrURL;
