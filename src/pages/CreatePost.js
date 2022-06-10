import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TextField,
  TableContainer,
  TablePagination,
  Tabs,
  Tab,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TabPanel, TabList, TabContext, LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import VIDEOGALLERIES from '../_mock/videogalleries';

// ----------------------------------------------------------------------

const defaultTheme = createTheme();


Object.assign(defaultTheme, {
  overrides: {
      MUIRichTextEditor: {
          root: {
              marginTop: 20,
          },
          editor: {
            height: "450px",
              borderBottom: "1px solid gray" 
          }
      }
  }
})


const TABLE_HEAD = [
  { id: 'name', label: 'Название', alignRight: false },
  { id: 'date', label: 'Дата создания', alignRight: false },
  { id: 'images', label: 'Видео', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState("1")

  const CreatePostSchema = Yup.object().shape({
    title: Yup.string().required('Заполните поле'),
    category: Yup.string().required('Выберите категорию'),
  });


  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      content: '',
    },
    validationSchema: CreatePostSchema,
   
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = VIDEOGALLERIES.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - VIDEOGALLERIES.length) : 0;

  const filteredUsers = applySortFilter(VIDEOGALLERIES, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Page name="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Новая запись
          </Typography>
        </Stack>

        <Card>  
          <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="basic tabs example">
          <Tab value="1" label={<Avatar src='/static/icons/uz.svg' variant='square' sx={{width: 20, height: 12}}/>}/>
          <Tab value="2" label={<Avatar src='/static/icons/ru.svg' variant='square' sx={{width: 20, height: 12}}/>}/>
          <Tab value="3" label={<Avatar src='/static/icons/us.svg' variant='square' sx={{width: 20, height: 12}}/>}/>
        </TabList>
        <TabPanel value={"1"}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  label="Введите заголовок"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  autoComplete="username"
                  label="Выберите заголовок"
                  select
                  {...getFieldProps('category')}
                  error={Boolean(touched.category && errors.category)}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
                <ThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor label="Start typing..." />
                </ThemeProvider>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Создать
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </TabPanel>
        <TabPanel value={"2"}>
          Item 2
        </TabPanel>
        <TabPanel value={"3"}>
          Item 3
        </TabPanel>
        </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
