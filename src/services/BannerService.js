import fetch from "../config/AppFetchInterceptor";

const BannerService = {};

BannerService.create = (data) => {
  return fetch({
    url: "/api/banner/create",
    method: "post",
    data,
  });
};

BannerService.update = (data) => {
  return fetch({
    url: "/api/posts/update",
    method: "post",
    data: data,
  });
};

BannerService.list = () => {
  return fetch({
    url: "/api/banner",
    method: "get",
  });
};

BannerService.delete = (post_id) => {
  return fetch({
    url: "/api/posts/delete",
    method: "post",
    data: {
      post_id,
    },
  });
};

export default BannerService;
