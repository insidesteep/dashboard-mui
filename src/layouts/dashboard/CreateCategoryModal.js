import {Box, Avatar, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material"
import {LoadingButton} from "@mui/lab"
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const CreateCategoryModal = ({open, onClose}) => {

    const CreateCategorySchema = Yup.object().shape({
        titleUz: Yup.string().required('Заполните поле'),
        titleRu: Yup.string().required('Заполните поле'),
        titleUs: Yup.string().required('Заполните поле'),
      });
    

    const formik = useFormik({
        initialValues: {
            titleUz: '',
            titleRu: '',
            titleUs: '',
        },
        validationSchema: CreateCategorySchema,
       
      });
    
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


    return <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Новая категория</DialogTitle>
    <DialogContent>
      <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Avatar src="/static/icons/uz.svg" variant="square" sx={{ color: 'action.active', mr: 1, my:  4.5, width: 20, height: 15 }}/>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Название категории на узбекском"
                    fullWidth
                    variant="standard"
                    {...getFieldProps('titleUz')}
                    error={Boolean(touched.titleUz && errors.titleUz)}
                    helperText={touched.titleUz && errors.titleUz}
                />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Avatar src="/static/icons/ru.svg" variant="square" sx={{ color: 'action.active', mr: 1, my: 4.5, width: 20, height: 15 }}/>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Название категории на русском"
                    fullWidth
                    variant="standard"
                    {...getFieldProps('titleRu')}
                    error={Boolean(touched.titleRu && errors.titleRu)}
                    helperText={touched.titleRu && errors.titleRu}
                />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Avatar src="/static/icons/us.svg" variant="square" sx={{ color: 'action.active', mr: 1, my: 4.5, width: 20, height: 15 }}/>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Название категории на английском"
                    fullWidth
                    variant="standard"
                    {...getFieldProps('titleUs')}
                    error={Boolean(touched.titleUs && errors.titleUs)}
                    helperText={touched.titleUs && errors.titleUs}
                />
                </Box>
                
                   
                   
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

export default CreateCategoryModal