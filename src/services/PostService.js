import fetch from "../config/AppFetchInterceptor";

const PostService = {};

PostService.create = (data) => {
  return fetch({
    url: "/api/posts/create",
    method: "post",
    data: data,
  });
};

PostService.update = (data) => {
  return fetch({
    url: "/api/posts/update",
    method: "post",
    data: data,
  });
};

PostService.list = () => {
  return fetch({
    url: "/api/posts",
    method: "get",
  });
};

PostService.delete = (post_id) => {
  return fetch({
    url: "/api/posts/delete",
    method: "post",
    data: {
      post_id,
    },
  });
};

export default PostService;
