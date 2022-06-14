import fetch from "../config/AuthFetchInterceptor";

const JWTAuthService = {};

JWTAuthService.login = (data) => {
  return fetch({
    url: "/api/login.php",
    method: "post",
    data: data,
  });
};

JWTAuthService.authorization = (data) => {
  return fetch({
    url: "/api/validate_token.php",
    method: "get",
  });
};


export default JWTAuthService