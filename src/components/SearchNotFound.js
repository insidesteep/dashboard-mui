import PropTypes from "prop-types";
// material
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Не найдено
      </Typography>
      <Typography variant="body2" align="center">
        Нет результатов для &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Попробуйте проверить на опечатки или
         используя полные слова.
      </Typography>
    </Paper>
  );
}
