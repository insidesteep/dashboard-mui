import fetch from "../config/AppFetchInterceptor";

const Photogallery = {};

Photogallery.create = (data) => {
  return fetch({
    url: "/api/gallery/upload",
    method: "post",
    data: data,
  });
};

Photogallery.list = (page = 1) => {
  return fetch({
    url: `/api/gallery?page=${page}`,
    method: "get",
  });
};

Photogallery.update = (data) => {
  return fetch({
    url: `/api/gallery/update`,
    method: "post",
    data,
  });
};

Photogallery.delete = (gallery_id) => {
  return fetch({
    url: "/api/gallery/delete",
    method: "post",
    data: { gallery_id },
  });
};

export default Photogallery;
