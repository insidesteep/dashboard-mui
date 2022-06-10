import {useEffect, useState} from 'react'
import {Box, ImageList, ImageListItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import {AddPhotoAlternate} from "@mui/icons-material"
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';



const CreatePhotogalleryModal = ({open, onClose}) => {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
      if(images > 1) return;

      const newImageURLs = []

      images.forEach(img => newImageURLs.push(URL.createObjectURL(img)))
      setImageURLs(newImageURLs);

    }, [images])

    const handleChangeImages = (e) => {
      setImages([...e.target.files]);
    }

    const CreatePhotogallerySchema = Yup.object().shape({
        title: Yup.string().required('Заполните поле'),
      });
    

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: CreatePhotogallerySchema,
       
      });
    
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


    return <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Новая фотогаллерея</DialogTitle>
    <DialogContent>
      <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                    prefix="2"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Название категории на английском"
                    fullWidth
                    sx={{
                      mr: "20px"
                    }}
                    variant="standard"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                />
                <label htmlFor="contained-button-file">
                  <input accept="image/*" id="contained-button-file" multiple type="file" style={{display: 'none'}} onChange={handleChangeImages}/>
                  <Button variant="outlined" component="span" startIcon={<AddPhotoAlternate />}>
                    Загрузить
                  </Button>
                </label>
                </Box>
                
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
        </Form>
      </FormikProvider>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Закрыть</Button>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Создать
                </LoadingButton>
    </DialogActions>
  </Dialog>
}

export default CreatePhotogalleryModal