// That's strange but i haven't found any npm package with websocket validator
export default (value) => {
  try {
    const url = new URL(value);
    return /^(wss?)/i.test(url.protocol);
  } catch (e) {
    return false;
  }
};
