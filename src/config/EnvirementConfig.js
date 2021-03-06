const dev = {
  API_ENDPOINT_URL: "https://emir-city.uz/",
};

const prod = {
  API_ENDPOINT_URL: "/",
};

// const dev = {
//   API_ENDPOINT_URL: "/",
// };

// const prod = {
//   API_ENDPOINT_URL: "/",
// };




const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    default:
      break;
  }
};

export const env = getEnv();