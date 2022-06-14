import fetch from "../config/AppFetchInterceptor";

const CategoryService = {};

CategoryService.create = (data) => {
  return fetch({
    url: "/api/category/create",
    method: "post",
    data: data,
  });
};

CategoryService.list = () => {
  return fetch({
    url: "/api/category",
    method: "get",
  });
};

export default CategoryService;
