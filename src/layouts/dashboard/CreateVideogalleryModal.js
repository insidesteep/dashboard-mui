import {useEffect, useState} from 'react'
import {Box, Alert, AlertTitle, Typography, ImageList, ImageListItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import {YoutubeSearchedFor} from "@mui/icons-material"
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import YouTube from 'react-youtube';



const CreateVideogalleryModal = ({open, onClose}) => {
    const [video, setVideo] = useState(null);
    const [error, setError] = useState({status: false, message: ''});

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    };


    const checkYouTubeID = async (ID) => {
      const response = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${ID}&format=json`);
      if(response.status !== 200){
        return false
      } 
      
      const data = await response.json();
      return data;
    }
 
  

    const onReady = (e) => {
      // access to player in all event handlers via event.target
      e.target.pauseVideo();
    }

    const CreateVideogallerySchema = Yup.object().shape({
        title: Yup.string().required('Заполните поле').min(3, "Минимум 3 символа"),
      });
    
    const onSearch = async () => {
      if(errors.title){
        return
      }

      const data = await checkYouTubeID(values.title);

      if(!data){
        setError({status: true, message: `Видео с ID - ${values.title} не существует!`});
        setVideo(null);
      } else {
        setError({status: false, message: ''})
        setVideo({...data, videoID: values.title});
      }

    }


    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: CreateVideogallerySchema,
       
      });
    
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
      console.log(error, video)

    return <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Новое видео</DialogTitle>
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
                    label="Введите YouTube ID"
                    fullWidth
                    variant="standard"
                    sx={{mr:"20px"}}
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                />
                <Button variant="outlined" component="span" startIcon={<YoutubeSearchedFor />} onClick={onSearch}>
                    Найти
                  </Button>
                </Box>
                
                {video && <>
                            <Typography variant="h4" gutterBottom component="div">
                              {video.title}
                            </Typography>
                            <YouTube videoId={video?.videoID} opts={opts} />
                          </>}
                {error.status && <Alert severity="error">
                            <AlertTitle>Ошибка</AlertTitle>
                              {error.message}
                            </Alert>}
                   
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
}

export default CreateVideogalleryModal