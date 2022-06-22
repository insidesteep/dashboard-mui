import fetch from "../config/AppFetchInterceptor";

const Videogallery = {};

Videogallery.create = (data) => {
  return fetch({
    url: "/api/posts/video",
    method: "post",
    data: data,
  });
};

Videogallery.list = () => {
  return fetch({
    url: "/api/videos",
    method: "get",
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
