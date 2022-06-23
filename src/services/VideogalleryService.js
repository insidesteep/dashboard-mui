import fetch from "../config/AppFetchInterceptor";

const Videogallery = {};

Videogallery.create = (data) => {
  return fetch({
    url: "/api/posts/video",
    method: "post",
    data,
  });
};

Videogallery.list = () => {
  return fetch({
    url: "/api/videos",
    method: "get",
  });
};

Videogallery.update = (data) => {
  return fetch({
    url: "/api/video/update",
    method: "post",
    data,
  });
};

Videogallery.delete = (video_id) => {
  return fetch({
    url: "/api/video/delete",
    method: "post",
    data: {
      video_id,
    },
  });
};

export default Videogallery;
