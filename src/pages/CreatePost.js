import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { filter, set } from "lodash";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "@tinymce/tinymce-react";
import ImageCropperModal from "../layouts/dashboard/ImageCropperModal";

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TextField,
  TableContainer,
  TablePagination,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  Snackbar,
  Alert,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { TabPanel, TabList, TabContext, LoadingButton } from "@mui/lab";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
// mock
import VIDEOGALLERIES from "../_mock/videogalleries";
import { AUTH_TOKEN } from "src/redux/constants/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoadingCategoryList,
  categoryList,
} from "../redux/actions/category";
import { showLoadingpostCreate, postCreate } from "../redux/actions/post";
import { API_BASE_URL } from "src/config/AppConfig";
import axios from "axios";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
      },
      editor: {
        height: "450px",
        borderBottom: "1px solid gray",
      },
    },
  },
});

const TABLE_HEAD = [
  { id: "name", label: "Название", alignRight: false },
  { id: "date", label: "Дата создания", alignRight: false },
  { id: "images", label: "Видео", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const API_URL = "https://emir-city.uz/api/photo/upload";

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [content, setContent] = useState({ uz: "", ru: "", en: "" });

  const [value, setValue] = useState("1");
  const [thumbnail, setThumbnail] = useState({ src: "", loading: false });
  const [isOpenCrop, setIsOpenCrop] = useState(false);

  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const { categories } = useSelector((state) => state.category);
  const { loading: createLoading, error: createError } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (createError.state) {
      setError(createError);
    } else {
      setError({
        state: false,
        message: "",
      });
    }
  }, [createError]);

  const onOpenCropModal = (file) => {
    const previewImage = URL.createObjectURL(file);

    setThumbnail({ src: previewImage, loading: false });
    setIsOpenCrop(true);
  };
  const onCloseCropModal = () => setIsOpenCrop(false);

  const CreatePostSchema = Yup.object().shape({
    category: Yup.string().required("Выберите категорию"),
    titleUz: Yup.string().required("Заполните поле"),
    titleRu: Yup.string().required("Заполните поле"),
    titleEn: Yup.string().required("Заполните поле"),
    thumbnail: Yup.mixed().transform((value) => console.log(value)),
  });

  console.log(createError, error);
  const onHideAlert = () => {
    setError({
      state: false,
      message: "",
    });
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      titleUz: "",
      titleRu: "",
      titleEn: "",
    },
    validationSchema: CreatePostSchema,
    onSubmit: (values) => {
      const newData = {
        category_id: values.category,
        previewimg: thumbnail.src,
        uz: {
          title: values.titleUz,
          description: content.uz,
        },
        ru: {
          title: values.titleRu,
          description: content.ru,
        },
        en: {
          title: values.titleEn,
          description: content.en,
        },
      };

      dispatch(showLoadingpostCreate());
      dispatch(postCreate(newData, () => navigate(-1)));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const uploadThumbnail = async (file) => {
    setThumbnail((prev) => ({ ...prev, loading: true }));

    const formData = new FormData();

    formData.append("posts_images", file);

    const response = await axios({
      method: "post",
      url: API_URL,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    });

    if (response.status != 200) {
      setThumbnail((prev) => ({ ...prev, loading: false }));
    }

    setThumbnail({ src: response.data.photo_url, loading: false });
  };

  const getCategoryByLang = (category) => {
    if (value == "1") return category.category_name_uz;

    if (value == "2") return category.category_name_ru;

    return category.category_name_en;
  };

  const handleChangeContent = (content) => {
    switch (value) {
      case "1":
        setContent((prevState) => ({ ...prevState, uz: content }));
        break;
      case "2":
        setContent((prevState) => ({ ...prevState, ru: content }));
        break;

      default:
        setContent((prevState) => ({ ...prevState, en: content }));
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = VIDEOGALLERIES.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - VIDEOGALLERIES.length)
      : 0;

  const filteredUsers = applySortFilter(
    VIDEOGALLERIES,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page name="User">
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Новая запись
              </Typography>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={createLoading}
              >
                Создать
              </LoadingButton>
            </Stack>

            <Card>
              <TabContext value={value}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={5}
                  p={2}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      value="1"
                      label={
                        <Avatar
                          src="/static/icons/uz.svg"
                          variant="square"
                          sx={{ width: 20, height: 12 }}
                        />
                      }
                    />
                    <Tab
                      value="2"
                      label={
                        <Avatar
                          src="/static/icons/ru.svg"
                          variant="square"
                          sx={{ width: 20, height: 12 }}
                        />
                      }
                    />
                    <Tab
                      value="3"
                      label={
                        <Avatar
                          src="/static/icons/us.svg"
                          variant="square"
                          sx={{ width: 20, height: 12 }}
                        />
                      }
                    />
                  </TabList>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormControl
                      error={Boolean(touched.thumbnail && errors.thumbnail)}
                    >
                      <label htmlFor="contained-button-file">
                        <Input
                          accept="image/*"
                          id="contained-button-file"
                          type="file"
                          style={{ display: "none" }}
                          aria-describedby="thumbnail"
                          {...getFieldProps("thumbnail")}
                          onChange={(e) => {
                            // uploadThumbnail(e.target.files[0]);
                            onOpenCropModal(e.target.files[0]);
                            getFieldProps("thumbnail").onChange(e);
                          }}
                        />
                        <LoadingButton
                          variant="contained"
                          loadingPosition="start"
                          component="span"
                          loading={thumbnail.loading}
                          startIcon={<Image />}
                        >
                          {thumbnail.loading
                            ? "Загрузка изображения"
                            : "Изображение записи"}
                        </LoadingButton>
                        {Boolean(touched.thumbnail && errors.thumbnail) && (
                          <FormHelperText id="thumbnail">
                            {errors.thumbnail}
                          </FormHelperText>
                        )}
                      </label>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="category-label-id">Категория</InputLabel>
                      <Select
                        onOpen={() => {
                          dispatch(categoryList());
                        }}
                        sx={{ width: 200 }}
                        labelId="category-label-id"
                        label="Выберите категорию"
                        {...getFieldProps("category")}
                        error={Boolean(touched.category && errors.category)}
                        helperText={touched.category && errors.category}
                      >
                        {categories.data.map((c) => (
                          <MenuItem key={c.id} value={c.id}>
                            {getCategoryByLang(c)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
                <Stack m={2}>
                  {thumbnail.src && (
                    <img width="100%" src={API_BASE_URL + thumbnail.src} />
                  )}
                </Stack>
                <TabPanel value={"1"}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Введите заголовок"
                      {...getFieldProps("titleUz")}
                      error={Boolean(touched.titleUz && errors.titleUz)}
                      helperText={touched.titleUz && errors.titleUz}
                    />
                    <Editor
                      // tinymceScriptSrc="/tinymce/tinymce.min.js"
                      apiKey="jmurcpps294xm8lwiqcs2igjc9x3htuxixlil2z8kp9ofc4s"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={content.uz}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: ["image"],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image| help",

                        images_upload_handler: (blobInfo, progress) =>
                          new Promise((resolve, reject) => {
                            const xhr = new XMLHttpRequest();
                            xhr.withCredentials = false;
                            xhr.open("POST", API_URL);
                            xhr.setRequestHeader(
                              "Authorization",
                              `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
                            );

                            xhr.upload.onprogress = (e) => {
                              progress((e.loaded / e.total) * 100);
                            };

                            xhr.onload = () => {
                              if (xhr.status === 403) {
                                reject({
                                  message: "HTTP Error: " + xhr.status,
                                  remove: true,
                                });
                                return;
                              }

                              if (xhr.status < 200 || xhr.status >= 300) {
                                reject("HTTP Error: " + xhr.status);
                                return;
                              }

                              const json = JSON.parse(xhr.responseText);

                              if (!json || typeof json.photo_url != "string") {
                                reject("Invalid JSON: " + xhr.responseText);
                                return;
                              }

                              resolve(`${API_BASE_URL}/${json.photo_url}`);
                            };

                            xhr.onerror = () => {
                              reject(
                                "Image upload failed due to a XHR Transport error. Code: " +
                                  xhr.status
                              );
                            };

                            const formData = new FormData();
                            formData.append(
                              "posts_images",
                              blobInfo.blob(),
                              blobInfo.filename()
                            );

                            xhr.send(formData);
                          }),
                        // images_upload_handler: () => console.log(2),
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={handleChangeContent}
                    />
                  </Stack>
                </TabPanel>
                <TabPanel value={"2"}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Введите заголовок"
                      {...getFieldProps("titleRu")}
                      error={Boolean(touched.titleRu && errors.titleRu)}
                      helperText={touched.titleRu && errors.titleRu}
                    />
                  </Stack>
                  <Editor
                    // tinymceScriptSrc="/tinymce/tinymce.min.js"
                    apiKey="jmurcpps294xm8lwiqcs2igjc9x3htuxixlil2z8kp9ofc4s"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={content.ru}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: ["image"],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | image| help",

                      images_upload_handler: (blobInfo, progress) =>
                        new Promise((resolve, reject) => {
                          const xhr = new XMLHttpRequest();
                          xhr.withCredentials = false;
                          xhr.open("POST", API_URL);
                          xhr.setRequestHeader(
                            "Authorization",
                            `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
                          );

                          xhr.upload.onprogress = (e) => {
                            progress((e.loaded / e.total) * 100);
                          };

                          xhr.onload = () => {
                            if (xhr.status === 403) {
                              reject({
                                message: "HTTP Error: " + xhr.status,
                                remove: true,
                              });
                              return;
                            }

                            if (xhr.status < 200 || xhr.status >= 300) {
                              reject("HTTP Error: " + xhr.status);
                              return;
                            }

                            const json = JSON.parse(xhr.responseText);

                            if (!json || typeof json.photo_url != "string") {
                              reject("Invalid JSON: " + xhr.responseText);
                              return;
                            }

                            resolve(`${API_BASE_URL}/${json.photo_url}`);
                          };

                          xhr.onerror = () => {
                            reject(
                              "Image upload failed due to a XHR Transport error. Code: " +
                                xhr.status
                            );
                          };

                          const formData = new FormData();
                          formData.append(
                            "posts_images",
                            blobInfo.blob(),
                            blobInfo.filename()
                          );

                          xhr.send(formData);
                        }),
                      // images_upload_handler: () => console.log(2),
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={handleChangeContent}
                  />
                </TabPanel>
                <TabPanel value={"3"}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Введите заголовок"
                      {...getFieldProps("titleEn")}
                      error={Boolean(touched.titleEn && errors.titleEn)}
                      helperText={touched.titleEn && errors.titleEn}
                    />
                    <Editor
                      // tinymceScriptSrc="/tinymce/tinymce.min.js"
                      apiKey="jmurcpps294xm8lwiqcs2igjc9x3htuxixlil2z8kp9ofc4s"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={content.en}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: ["image"],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | image| help",

                        images_upload_handler: (blobInfo, progress) =>
                          new Promise((resolve, reject) => {
                            const xhr = new XMLHttpRequest();
                            xhr.withCredentials = false;
                            xhr.open("POST", API_URL);
                            xhr.setRequestHeader(
                              "Authorization",
                              `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
                            );

                            xhr.upload.onprogress = (e) => {
                              progress((e.loaded / e.total) * 100);
                            };

                            xhr.onload = () => {
                              if (xhr.status === 403) {
                                reject({
                                  message: "HTTP Error: " + xhr.status,
                                  remove: true,
                                });
                                return;
                              }

                              if (xhr.status < 200 || xhr.status >= 300) {
                                reject("HTTP Error: " + xhr.status);
                                return;
                              }

                              const json = JSON.parse(xhr.responseText);

                              if (!json || typeof json.photo_url != "string") {
                                reject("Invalid JSON: " + xhr.responseText);
                                return;
                              }

                              resolve(`${API_BASE_URL}/${json.photo_url}`);
                            };

                            xhr.onerror = () => {
                              reject(
                                "Image upload failed due to a XHR Transport error. Code: " +
                                  xhr.status
                              );
                            };

                            const formData = new FormData();
                            formData.append(
                              "posts_images",
                              blobInfo.blob(),
                              blobInfo.filename()
                            );

                            xhr.send(formData);
                          }),
                        // images_upload_handler: () => console.log(2),
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={handleChangeContent}
                    />
                  </Stack>
                </TabPanel>
              </TabContext>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
      <ImageCropperModal
        open={isOpenCrop}
        onClose={onCloseCropModal}
        image={thumbnail}
        onUpload={uploadThumbnail}
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={error.state}
        autoHideDuration={6000}
        onClose={onHideAlert}
      >
        <Alert onClose={onHideAlert} severity="error" sx={{ width: "100%" }}>
          {error.message}
        </Alert>
      </Snackbar>
    </Page>
  );
}
