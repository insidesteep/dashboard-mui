import { useEffect, useState, useCallback } from "react";
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
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AddPhotoAlternate } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import {
  photogalleryCreate,
  showLoadingPhotogalleryCreate,
} from "../../redux/actions/photogallery";
import getCroppedImg from "../../utils/cropImage";

const CreatePhotogalleryModal = ({ open, onClose, image, onUpload }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const uploadImg = async () => {
    const croppedImg = await getCroppedImg(image.src, croppedAreaPixels);
    console.log(croppedImg);

    await onUpload(croppedImg);
    handleClose();
  };

  const handleClose = () => {
    if (!image.loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="80%">
      <DialogContent>
        <Stack
          m={2}
          sx={{ position: "relative", height: "500px" }}
          direction="column-reverse"
        >
          <Cropper
            image={image.src}
            crop={crop}
            cropSize={{ width: 600, height: 400 }}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <input
            style={{ position: "relative", top: 20 }}
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          onClick={uploadImg}
          loading={image.loading}
        >
          Вырезать
        </LoadingButton>
      </DialogActions>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={false}
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
