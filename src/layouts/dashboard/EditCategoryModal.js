import {
  Box,
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryUpdate,
  showLoadingCategoryUpdate,
} from "../../redux/actions/category";
import { useEffect } from "react";

const CreateCategoryModal = ({ open, onClose, categoryId }) => {
  const { loading, categories } = useSelector((state) => state.category);
  const disoatch = useDispatch();

  useEffect(() => {
    if (categoryId) {
      const category = categories.data.find((c) => c.id == categoryId);

      if (!category) return;

      formik.setValues({
        titleUz: category.category_name_uz,
        titleRu: category.category_name_ru,
        titleUs: category.category_name_en,
      });
    }
  }, [categoryId]);

  const CreateCategorySchema = Yup.object().shape({
    titleUz: Yup.string().required("Заполните поле"),
    titleRu: Yup.string().required("Заполните поле"),
    titleUs: Yup.string().required("Заполните поле"),
  });

  const formik = useFormik({
    initialValues: {
      titleUz: "",
      titleRu: "",
      titleUs: "",
    },
    validationSchema: CreateCategorySchema,
    onSubmit: (values) => {
      disoatch(showLoadingCategoryUpdate());
      disoatch(
        categoryUpdate(
          {
            category_id: categoryId,
            category_name_uz: values.titleUz,
            category_name_ru: values.titleRu,
            category_name_en: values.titleUs,
          },
          handleClose
        )
      );
    },
  });

  console.log(loading);

  const handleClose = () => {
    if (!loading) {
      formik.resetForm();
      onClose();
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>Редактирование категории</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Avatar
                  src="/static/icons/uz.svg"
                  variant="square"
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 4.5,
                    width: 20,
                    height: 15,
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Название категории на узбекском"
                  fullWidth
                  variant="standard"
                  {...getFieldProps("titleUz")}
                  error={Boolean(touched.titleUz && errors.titleUz)}
                  helperText={touched.titleUz && errors.titleUz}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Avatar
                  src="/static/icons/ru.svg"
                  variant="square"
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 4.5,
                    width: 20,
                    height: 15,
                  }}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Название категории на русском"
                  fullWidth
                  variant="standard"
                  {...getFieldProps("titleRu")}
                  error={Boolean(touched.titleRu && errors.titleRu)}
                  helperText={touched.titleRu && errors.titleRu}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Avatar
                  src="/static/icons/us.svg"
                  variant="square"
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 4.5,
                    width: 20,
                    height: 15,
                  }}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Название категории на английском"
                  fullWidth
                  variant="standard"
                  {...getFieldProps("titleUs")}
                  error={Boolean(touched.titleUs && errors.titleUs)}
                  helperText={touched.titleUs && errors.titleUs}
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Закрыть</Button>
            <LoadingButton type="submit" variant="contained" loading={loading}>
              Обновить
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default CreateCategoryModal;
