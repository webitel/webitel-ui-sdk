// That's strange but i haven't found any npm package with websocket validator
export default (value) => (/^(wss?:\/\/)([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[^\/]+)(\:[0-9]{1,5})?(.*)$/i).test(value);
