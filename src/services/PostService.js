import fetch from "../config/AppFetchInterceptor";

const PostService = {};

PostService.create = (data) => {
  return fetch({
    url: "/api/posts/create",
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

export default PostService;
