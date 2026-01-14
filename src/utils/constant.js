//const BASE_URL = "http://localhost:7777";
//const BASE_URL = "/api";

const BASE_URL = location.hostname === 'localhost' ? 'http://localhost:7777' : '/api'

export { BASE_URL };