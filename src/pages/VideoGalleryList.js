import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
// mock

import CreateVideogalleryModal from "../layouts/dashboard/CreateVideogalleryModal";
import EditVideogalleryModal from "../layouts/dashboard/EditVideogalleryModal";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoadingvideogalleryList,
  videogalleryList,
  showLoadingvideogalleryDelete,
  videogalleryDelete,
} from "../redux/actions/videogallery";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "title_uz", label: "Название", alignRight: false },
  { id: "created_at", label: "Дата создания", alignRight: false },
  { id: "imagpreviewlinkes", label: "Видео", alignRight: false },
  { id: "" },
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
  return order === "desc"
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
    return filter(
      array,
      (_user) =>
        _user.title_uz.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("title_uz");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const { videogallery, error: videoError } = useSelector(
    (state) => state.videogallery
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoadingvideogalleryList());
    dispatch(videogalleryList());
  }, []);

  useEffect(() => {
    if (videoError.state) {
      setError(videoError);
    } else {
      setError({
        state: false,
        message: "",
      });
    }
  }, [videoError]);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onOpenEditModal = (id) => {
    setVideoId(id);
    setIsEdit(true);
  };

  const onCloseEditModal = () => {
    setIsEdit(false);
    setVideoId(null);
  };

  const onHideAlert = () => {
    setError({
      state: false,
      error: "",
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = videogallery.data.option.map((n) => n.title_uz);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
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

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - videogallery.data.option.length)
      : 0;

  const filteredUsers = applySortFilter(
    videogallery.data.option,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const onDelete = (id) => {
    dispatch(showLoadingvideogalleryDelete());
    dispatch(videogalleryDelete(id));
  };

  return (
    <Page name="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Видео
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={onOpen}
          >
            Добавить видео
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Поиск видео ..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={videogallery.data.all_items}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { video_id, title_uz, created_at, previewlink } =
                        row;
                      const isItemSelected = selected.indexOf(title_uz) !== -1;

                      return (
                        <TableRow
                          hover
                          key={video_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, title_uz)}
                            />
                          </TableCell>
                          <TableCell align="left">{title_uz}</TableCell>
                          <TableCell align="left">{created_at}</TableCell>
                          <TableCell align="left">
                            <Avatar alt="Travis Howard" src={previewlink} />
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              onDelete={() => onDelete(video_id)}
                              onEdit={() => onOpenEditModal(video_id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {videogallery.data.all_items && (
            <TablePagination
              rowsPerPageOptions={[]}
              labelDisplayedRows={({ from, to, count, page }) =>
                `${from}–${to} из ${count !== -1 ? count : `больше, чем ${to}`}`
              }
              component="div"
              count={videogallery.data.all_items}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
      <CreateVideogalleryModal open={open} onClose={onClose} />
      <EditVideogalleryModal
        open={isEdit}
        onClose={onCloseEditModal}
        videoId={videoId}
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={error.state}
        autoHideDuration={6000}
        onClose={onHideAlert}
      >
        <Alert onClose={onHideAlert} severity="error" sx={{ width: "100%" }}>
          {error.message}
        </Alert>
      </Snackbar>
    </Page>
  );
}
