export const BASE_URL =
  "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/";

export const CROSS_DOMAIN = "https://the-ultimate-api-challenge.herokuapp.com";
export const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

export const headers = {
  basic: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  },
};
