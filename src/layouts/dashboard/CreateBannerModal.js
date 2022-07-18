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
  bannerCreate,
  showLoadingBannerCreate,
} from "../../redux/actions/banner";
import axios from "axios";
import { API_BASE_URL } from "src/config/AppConfig";
import { AUTH_TOKEN } from "src/redux/constants/auth";

const CreateBannerModal = ({ open, onClose }) => {
  const [image, setImage] = useState({
    loading: false,
    url: "",
  });

  const { loading } = useSelector((state) => state.banner);

  const dispatch = useDispatch();

  const handleChangeImages = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = async () => {
        if (img.width == 1400 && img.height == 600) {
          const formData = new FormData();

          setImage((prev) => ({ ...prev, loading: true }));

          formData.append("posts_images", file);

          const data = await axios.post(
            `${API_BASE_URL}api/photo/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
              },
            }
          );

          if (data.status == 200) {
            setImage({
              loading: false,
              url: data.data.compressed_url,
            });
          } else {
            setImage((prev) => ({ ...prev, loading: false }));
          }
        }
      };
    };
  };

  const handleClose = () => {
    if (!loading) {
      setImage({
        loading: false,
        url: "",
      });
      onClose();
    }
  };

  const onSubmit = () => {
    if (image.url) {
      dispatch(showLoadingBannerCreate());
      dispatch(bannerCreate({ banner_url: image.url }), onClose);
    }
  };

  const CreateBannerSchema = Yup.object().shape({
    titleUz: Yup.string().required("Заполните поле"),
    titleRu: Yup.string().required("Заполните поле"),
    titleEn: Yup.string().required("Заполните поле"),
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Новый баннер</DialogTitle>
      <DialogContent>
        <Alert severity="info" sx={{ my: 2 }}>
          Загрузите изображение в разрешении 1400x600. Изображение с
          некорректным разрешением будет игнорировано
        </Alert>
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleChangeImages}
          />
          <LoadingButton
            variant="outlined"
            component="span"
            startIcon={<AddPhotoAlternate />}
            loading={image.loading}
          >
            Загрузить
          </LoadingButton>
        </label>

        {image.url && (
          <img
            style={{ marginTop: "1rem" }}
            src={API_BASE_URL + image.url}
            width="100%"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          onClick={onSubmit}
          disabled={!image.url}
        >
          Создать
        </LoadingButton>
      </DialogActions>
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

export default CreateBannerModal;
