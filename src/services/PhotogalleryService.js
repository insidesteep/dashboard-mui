import fetch from "../config/AppFetchInterceptor";

const Photogallery = {};

Photogallery.create = (data) => {
  return fetch({
    url: "/api/gallery/upload",
    method: "post",
    data: data,
  });
};

Photogallery.list = () => {
  return fetch({
    url: "/api/posts",
    method: "get",
  });
};

export default Photogallery;
