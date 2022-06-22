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
  IconButton,
  AvatarGroup,
  CircularProgress,
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
import CreatePhotogalleryModal from "../layouts/dashboard/CreatePhotogalleryModal";
import EditPhotogalleryModal from "../layouts/dashboard/EditPhotogalleryModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoadingPhotogalleryList,
  photogalleryList,
  showLoadingPhotogalleryDelete,
  photogalleryDelete,
} from "../redux/actions/photogallery";
import { API_BASE_URL } from "src/config/AppConfig";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "tittle_uz", label: "Название", alignRight: false },
  { id: "created_at", label: "Дата создания", alignRight: false },
  { id: "gallery", label: "Изображения", alignRight: false },
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
      (_user) => _user.tittle_uz.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("tittle_uz");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);

  const { photogallery } = useSelector((state) => state.photogallery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoadingPhotogalleryList());
    dispatch(photogalleryList());
  }, []);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onOpenEditModal = (id) => {
    setEditID(id);
    setIsEdit(true);
  };

  const onCloseEditModal = () => {
    setIsEdit(false);
    setEditID(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = photogallery.data.option.map((n) => n.tittle_uz);
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
      ? Math.max(0, (1 + page) * rowsPerPage - photogallery.data.option.length)
      : 0;

  const filteredUsers = applySortFilter(
    photogallery.data.option,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const onDelete = (id) => {
    dispatch(showLoadingPhotogalleryDelete());
    dispatch(photogalleryDelete(id));
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
            Фотогалереи
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={onOpen}
          >
            Создать галлерея
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Поиск галереи ..."
          />

          {!photogallery.data.loading ? (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={photogallery.data.all_items}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const { gallery_id, tittle_uz, created_at, gallery } =
                            row;
                          const isItemSelected =
                            selected.indexOf(tittle_uz) !== -1;

                          return (
                            <TableRow
                              hover
                              key={gallery_id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) =>
                                    handleClick(event, tittle_uz)
                                  }
                                />
                              </TableCell>
                              <TableCell align="left">{tittle_uz}</TableCell>
                              <TableCell align="left">{created_at}</TableCell>
                              <TableCell align="left">
                                <AvatarGroup max={4} variant="rounded">
                                  {gallery.map((src) => (
                                    <Avatar
                                      key={src}
                                      src={API_BASE_URL + "images" + src}
                                    />
                                  ))}
                                </AvatarGroup>
                              </TableCell>
                              <TableCell align="right">
                                <UserMoreMenu
                                  onDelete={() => onDelete(gallery_id)}
                                  onEdit={() => onOpenEditModal(gallery_id)}
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

              {photogallery.data.all_items && (
                <TablePagination
                  rowsPerPageOptions={[]}
                  labelDisplayedRows={({ from, to, count, page }) =>
                    `${from}–${to} из ${
                      count !== -1 ? count : `больше, чем ${to}`
                    }`
                  }
                  component="div"
                  count={photogallery.data.all_items}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </>
          ) : (
            <Stack
              sx={{ my: 20 }}
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <CircularProgress />
              <Typography>Загрузка фотогалереи ...</Typography>
            </Stack>
          )}
        </Card>
      </Container>
      <CreatePhotogalleryModal open={open} onClose={onClose} />
      <EditPhotogalleryModal
        open={isEdit}
        onClose={onCloseEditModal}
        galleryId={editID}
      />
    </Page>
  );
}
