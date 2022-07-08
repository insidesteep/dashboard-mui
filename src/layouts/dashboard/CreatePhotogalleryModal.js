import { useEffect, useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Backdrop,
  CircularProgress,
  Typography,
  ImageListItemBar,
  IconButton,
  Alert,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AddPhotoAlternate } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  photogalleryCreate,
  showLoadingPhotogalleryCreate,
} from "../../redux/actions/photogallery";

const CreatePhotogalleryModal = ({ open, onClose }) => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const { loading } = useSelector((state) => state.photogallery);

  const dispatch = useDispatch();

  useEffect(() => {
    if (images > 1) return;

    const newImageURLs = [];

    images.forEach((img) =>
      newImageURLs.push({
        name: img.name,
        src: URL.createObjectURL(img),
      })
    );
    setImageURLs(newImageURLs);
  }, [images]);

  const handleChangeImages = async (e) => {
    const correctImages = [];

    await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
              if (img.width == 600 && img.height == 400) {
                console.log(1);
                correctImages.push(file);
                resolve(file);
              }
              resolve();
            };
          };
        });
      })
    );

    setImages([...correctImages]);
  };

  const handleClose = () => {
    if (!loading) {
      formik.resetForm();
      setImageURLs([]);
      setImages([]);
      onClose();
    }
  };

  const CreatePhotogallerySchema = Yup.object().shape({
    titleUz: Yup.string().required("Заполните поле"),
    titleRu: Yup.string().required("Заполните поле"),
    titleEn: Yup.string().required("Заполните поле"),
  });

  const formik = useFormik({
    initialValues: {
      titleUz: "",
      titleRu: "",
      titleEn: "",
    },
    validationSchema: CreatePhotogallerySchema,
    onSubmit: (values) => {
      if (images.length) {
        const formData = new FormData();

        formData.append("tittle_uz", values.titleUz);
        formData.append("tittle_ru", values.titleUz);
        formData.append("tittle_en", values.titleEn);

        images.forEach((img) => formData.append("gallery_images[]", img));

        dispatch(showLoadingPhotogalleryCreate());
        dispatch(photogalleryCreate(formData, handleClose));
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const onRemoveImg = (name) => {
    const urls = imageURLs.filter((img) => img.name != name);
    const imgs = images.filter((img) => img.name != name);

    console.log(urls, imgs);

    setImages(imgs);
    setImageURLs(urls);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Новая фотогалерея</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                prefix="2"
                autoFocus
                margin="dense"
                id="name"
                label="Название галереи на узбекском"
                fullWidth
                sx={{
                  mr: "20px",
                }}
                variant="standard"
                {...getFieldProps("titleUz")}
                error={Boolean(touched.titleUz && errors.titleUz)}
                helperText={touched.titleUz && errors.titleUz}
              />

              <TextField
                prefix="2"
                margin="dense"
                id="name"
                label="Название галереи на русском"
                fullWidth
                sx={{
                  mr: "20px",
                }}
                variant="standard"
                {...getFieldProps("titleRu")}
                error={Boolean(touched.titleRu && errors.titleRu)}
                helperText={touched.titleRu && errors.titleRu}
              />

              <TextField
                prefix="2"
                margin="dense"
                id="name"
                label="Название галереи на английском"
                fullWidth
                sx={{
                  mr: "20px",
                }}
                variant="standard"
                {...getFieldProps("titleEn")}
                error={Boolean(touched.titleEn && errors.titleEn)}
                helperText={touched.titleEn && errors.titleEn}
              />
              <Alert severity="info">
                Загрузите изображения в разрешении 600x400. Некорректные
                разрешения будут игнорированы
              </Alert>
              <label htmlFor="contained-button-file">
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChangeImages}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AddPhotoAlternate />}
                >
                  Загрузить
                </Button>
              </label>
              <ImageList cols={3}>
                {imageURLs.map(({ name, src }) => (
                  <ImageListItem key={src}>
                    <img
                      src={`${src}`}
                      srcSet={`${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={src}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      position="top"
                      actionIcon={
                        <IconButton
                          onClick={() => onRemoveImg(name)}
                          sx={{ color: "white" }}
                          aria-label={`star ${src}`}
                        >
                          <DeleteOutline />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Закрыть</Button>
            <LoadingButton type="submit" variant="contained">
              Создать
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress color="inherit" />
          <Typography variant="subtitle1">Сохранение галереи...</Typography>
        </Stack>
      </Backdrop>
    </Dialog>
  );
};

export default CreatePhotogalleryModal;
