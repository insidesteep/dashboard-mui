import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
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
import CreateCategoryModal from "../layouts/dashboard/CreateCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoadingCategoryList,
  categoryList,
} from "../redux/actions/category";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "category_name_uz", label: "UZ", alignRight: false },
  { id: "category_name_ru", label: "RU", alignRight: false },
  { id: "category_name_en", label: "EN", alignRight: false },
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
        _user.category_name_uz.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("category_name_ru");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoadingCategoryList());
    dispatch(categoryList());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categories.data.map((n) => n.category_name_ru);
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
      ? Math.max(0, (1 + page) * rowsPerPage - categories.data.length)
      : 0;

  const filteredUsers = applySortFilter(
    categories.data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Категории
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={onOpen}
          >
            Создать категорию
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            placeholder="Поиск категории ..."
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {!categories.data.loading ? (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={categories.data.length}
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
                          const {
                            id,
                            category_name_ru,
                            category_name_uz,
                            category_name_en,
                          } = row;
                          const isItemSelected =
                            selected.indexOf(category_name_uz) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) =>
                                    handleClick(event, category_name_uz)
                                  }
                                />
                              </TableCell>
                              <TableCell align="left">
                                {category_name_uz}
                              </TableCell>
                              <TableCell align="left">
                                {category_name_ru}
                              </TableCell>
                              <TableCell align="left">
                                {category_name_en}
                              </TableCell>

                              <TableCell align="right">
                                <UserMoreMenu />
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />{" "}
            </>
          ) : (
            <Stack
              sx={{ my: 20 }}
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <CircularProgress />
              <Typography>Загрузка категорий ...</Typography>
            </Stack>
          )}
        </Card>
      </Container>
      <CreateCategoryModal open={open} onClose={onClose} />
    </Page>
  );
}
