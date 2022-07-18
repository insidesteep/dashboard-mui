// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Категории",
    path: "/dashboard/categories",
    icon: getIcon("bxs:category"),
  },
  {
    title: "Записи",
    path: "/dashboard/posts",
    icon: getIcon("bi:file-earmark-post-fill"),
  },
  {
    title: "Фотогалерея",
    path: "/dashboard/photogalleries",
    icon: getIcon("clarity:image-gallery-solid"),
  },
  {
    title: "Видеогалерея",
    path: "/dashboard/videogalleries",
    icon: getIcon("clarity:video-gallery-solid"),
  },
  {
    title: "Баннеры",
    path: "/dashboard/banners",
    icon: getIcon("ep:data-board"),
  },
];

export default navConfig;
