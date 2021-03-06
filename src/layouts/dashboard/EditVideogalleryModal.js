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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { YoutubeSearchedFor } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import YouTube from "react-youtube";
import {
  showLoadingvideogalleryUpdate,
  videogalleryUpdate,
} from "../../redux/actions/videogallery";
import { useDispatch, useSelector } from "react-redux";

const CreateVideogalleryModal = ({ open, onClose, videoId }) => {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState({ status: false, message: "" });

  const { loading, videogallery } = useSelector((state) => state.videogallery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videoId) {
      const video = videogallery.data.option.find((v) => v.video_id == videoId);

      if (!video) return;

      const ytId = video.youtubelink.split("embed/")[1];

      setVideo({ videoID: ytId, thumbnail_url: video.previewlink });

      formik.setValues({
        uz: video.title_uz,
        ru: video.title_ru,
        en: video.title_en,
        id: ytId,
      });
      console.log(video);
    }
  }, [videoId]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      formik.resetForm();
    }
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
    id: Yup.string().required("?????????????????? ????????").min(3, "?????????????? 3 ??????????????"),
    uz: Yup.string().required("?????????????????? ????????"),
    ru: Yup.string().required("?????????????????? ????????"),
    en: Yup.string().required("?????????????????? ????????"),
  });

  const onSearch = async () => {
    if (errors.id) {
      return;
    }

    const data = await checkYouTubeID(values.id);

    if (!data) {
      setError({
        status: true,
        message: `?????????? ?? ID - ${values.id} ???? ????????????????????!`,
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

  console.log(video);
  const formik = useFormik({
    initialValues: {
      id: "",
      uz: "",
      ru: "",
      en: "",
    },
    validationSchema: CreateVideogallerySchema,
    onSubmit: (values) => {
      const data = {
        youtubelink: `https://www.youtube.com/embed/${video.videoID}`,
        previewlink: video.thumbnail_url,
        title_uz: values.uz,
        title_ru: values.ru,
        title_en: values.en,
        video_id: videoId,
      };

      dispatch(showLoadingvideogalleryUpdate());
      dispatch(videogalleryUpdate(data, handleClose));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;
  console.log(error, video);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>???????????????????????????? ??????????</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  prefix="2"
                  autoFocus
                  margin="dense"
                  label="?????????????? YouTube ID"
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
                  ??????????
                </Button>
                <Stack></Stack>
              </Box>

              {video && (
                <>
                  <TextField
                    margin="dense"
                    label="???????????????? ?????????? ???? ??????????????????"
                    fullWidth
                    variant="standard"
                    sx={{ mr: "20px" }}
                    {...getFieldProps("uz")}
                    error={Boolean(touched.uz && errors.uz)}
                    helperText={touched.uz && errors.uz}
                  />
                  <TextField
                    margin="dense"
                    label="???????????????? ?????????? ???? ??????????????"
                    fullWidth
                    variant="standard"
                    sx={{ mr: "20px" }}
                    {...getFieldProps("ru")}
                    error={Boolean(touched.ru && errors.ru)}
                    helperText={touched.ru && errors.ru}
                  />
                  <TextField
                    margin="dense"
                    label="???????????????? ?????????? ???? ????????????????????"
                    fullWidth
                    variant="standard"
                    sx={{ mr: "20px" }}
                    {...getFieldProps("en")}
                    error={Boolean(touched.en && errors.en)}
                    helperText={touched.en && errors.en}
                  />
                  <Divider>
                    <Chip label="????????????" />
                  </Divider>
                  <img width="100%" src={video.thumbnail_url} />
                  <Divider />
                  <Divider>
                    <Chip label="??????????" />
                  </Divider>
                  <YouTube videoId={video?.videoID} opts={opts} />
                  <Divider />
                </>
              )}
              {error.status && (
                <Alert severity="error">
                  <AlertTitle>????????????</AlertTitle>
                  {error.message}
                </Alert>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>??????????????</Button>
            <LoadingButton type="submit" variant="contained" loading={loading}>
              ????????????????
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
          <Typography variant="subtitle1">???????????????????? ??????????...</Typography>
        </Stack>
      </Backdrop>
    </Dialog>
  );
};

export default CreateVideogalleryModal;
