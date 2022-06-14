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
} from "@mui/material";
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

    images.forEach((img) => newImageURLs.push(URL.createObjectURL(img)));
    setImageURLs(newImageURLs);
  }, [images]);

  const handleChangeImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
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
        images.forEach((img) => formData.append("images[]", img));

        dispatch(showLoadingPhotogalleryCreate());
        dispatch(photogalleryCreate(formData, handleClose));
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Новая фотогаллерея</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                prefix="2"
                autoFocus
                margin="dense"
                id="name"
                label="Название категории на узбекском"
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
                label="Название категории на русском"
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
                label="Название категории на английском"
                fullWidth
                sx={{
                  mr: "20px",
                }}
                variant="standard"
                {...getFieldProps("titleEn")}
                error={Boolean(touched.titleEn && errors.titleEn)}
                helperText={touched.titleEn && errors.titleEn}
              />

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
                {imageURLs.map((url) => (
                  <ImageListItem key={url}>
                    <img
                      src={`${url}`}
                      srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={url}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Закрыть</Button>
            <LoadingButton type="submit" variant="contained" loading={loading}>
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
