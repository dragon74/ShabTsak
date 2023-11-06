import {
  TableCell,
  TableRow,
  IconButton,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGravatarUrl } from "../../GuardList/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const GuardItem = ({ guard, onEdit, onDelete }) => (
  <TableRow key={guard.id}>
    <TableCell>
      <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
    </TableCell>
    <TableCell>
      <div>{guard.name}</div>
      <div>Email: {guard.mail}</div>
      <div>Phone: {guard.phone}</div>
    </TableCell>
    <TableCell>
      <Chip
        label={guard?.shouldBeAllocated ? "משתתף" : "לא משתתף"}
        color={guard?.shouldBeAllocated ? "primary" : "secondary"}
      />
    </TableCell>
    <TableCell>
      <Button
        component={Link}
        to={`/guards/${guard.id}`}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ marginRight: "10px" }}
      >
        מגבלות
      </Button>
      <IconButton onClick={() => onEdit(guard)} size="large">
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(guard)} size="large">
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

GuardItem.propTypes = {
  guard: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GuardItem;
