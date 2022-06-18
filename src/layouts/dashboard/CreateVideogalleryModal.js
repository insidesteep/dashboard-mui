import { useEffect, useState } from "react";
import {
  Box,
  Alert,
  AlertTitle,
  Typography,
  ImageList,
  ImageListItem,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { YoutubeSearchedFor } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import YouTube from "react-youtube";

const CreateVideogalleryModal = ({ open, onClose }) => {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState({ status: false, message: "" });

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const checkYouTubeID = async (ID) => {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${ID}&format=json`
    );
    if (response.status !== 200) {
      return false;
    }

    const data = await response.json();
    return data;
  };

  const onReady = (e) => {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  };

  const CreateVideogallerySchema = Yup.object().shape({
    id: Yup.string().required("Заполните поле").min(3, "Минимум 3 символа"),
    uz: Yup.string().required("Заполните поле"),
    ru: Yup.string().required("Заполните поле"),
    en: Yup.string().required("Заполните поле"),
  });

  const onSearch = async () => {
    if (errors.id) {
      return;
    }

    const data = await checkYouTubeID(values.id);

    if (!data) {
      setError({
        status: true,
        message: `Видео с ID - ${values.id} не существует!`,
      });
      setVideo(null);
    } else {
      setError({ status: false, message: "" });
      setVideo({ ...data, videoID: values.id });
      formik.setValues((values) => ({
        ...values,
        uz: data.title,
        ru: data.title,
        en: data.title,
      }));
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
    },
    validationSchema: CreateVideogallerySchema,
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  console.log(error, video);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Новое видео</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  prefix="2"
                  autoFocus
                  margin="dense"
                  label="Введите YouTube ID"
                  fullWidth
                  variant="standard"
                  sx={{ mr: "20px" }}
                  {...getFieldProps("id")}
                  error={Boolean(touched.id && errors.id)}
                  helperText={touched.id && errors.id}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<YoutubeSearchedFor />}
                  onClick={onSearch}
                >
                  Найти
                </Button>
                <Stack></Stack>
              </Box>

              {video && (
                <>
                  <TextField
                    margin="dense"
                    label="Название видео на узбекском"
                    fullWidth
                    variant="standard"
                    sx={{ mr: "20px" }}
                    {...getFieldProps("uz")}
                    error={Boolean(touched.uz && errors.uz)}
                    helperText={touched.uz && errors.uz}
                  />
                  <TextField
                    margin="dense"
                    label="Название видео на русском"
                    fullWidth
                    variant="standard"
                    sx={{ mr: "20px" }}
                    {...getFieldProps("ru")}
                    error={Boolean(touched.ru && errors.ru)}
                    helperText={touched.ru && errors.ru}
                  />
                  <TextField
                    margin="dense"
                    label="Название видео на английском"
                    fullWidth
                    variant="standard"
                    sx={{ mr: "20px" }}
                    {...getFieldProps("en")}
                    error={Boolean(touched.en && errors.en)}
                    helperText={touched.en && errors.en}
                  />
                  <Divider>
                    <Chip label="Превью" />
                  </Divider>
                  <img width="100%" src={video.thumbnail_url} />
                  <Divider />
                  <Divider>
                    <Chip label="Видео" />
                  </Divider>
                  <YouTube videoId={video?.videoID} opts={opts} />
                  <Divider />
                </>
              )}
              {error.status && (
                <Alert severity="error">
                  <AlertTitle>Ошибка</AlertTitle>
                  {error.message}
                </Alert>
              )}
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Добавить
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVideogalleryModal;
